// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

// 2000000000000000000  -> 2 ENER
// 600000000000000000   -> 0.5KWH
contract Staker {
  using SafeERC20 for IERC20;


  // ERC20 Contract address : governannce token (ENER) 
  IERC20 public immutable governanceToken;
  // ERC20 Contract address : utility token (KWH) 
  IERC20 public immutable utilityToken;
  
  //주소별 금액과 입금 시간 저장
  mapping(address => uint256) public balances;
  mapping(address => uint256) public depositTimestamps;
  mapping(address => uint256) public rewards;
  
  // Keep track of address that are staking. This is needed because mapping cannot be iterated in solidity. Note that this should be optimized before rolling out to production
  address[] stakedAddresses;  


  // TODO: 
  uint256 public lockDuration = 1 days;
  // uint256 public lockDuration = 30 days;
  
  uint256 public stakingRewardRate;  // in percentage e.g. 40 -> 40% 
  uint256 public totalStaked;
  uint256 public utilityTokenRewardPool;
  uint256 public utilityTokenRewardPoolBalance;
  uint256 public governanceTokenStakingRewardPool;

  address public owner; // Owner of the smart contract
  mapping(address => bool) public adminMap;

  event Stake(address indexed sender, uint256 amount);
  event Received(address, uint);

  constructor(address _enerToken, address _kwhToken, uint256 _stakingRewardRate) {
      require(_kwhToken != address(0), "utilityToken can not be zero");
      utilityToken = IERC20(_kwhToken);
      // Initialize governance token object
      require(_enerToken != address(0), "governanceTokenAddress can not be zero");
      governanceToken = IERC20(_enerToken);
      
      owner = msg.sender; // Set the owner to the deployer
      adminMap[owner] = true;
      stakingRewardRate = _stakingRewardRate;
      
  }

  modifier notCompleted() {
    require(rewards[msg.sender] != 0, "No reward to claim!");
    _;
  }

  function stake(uint256 amount) public payable {
    require(amount <= governanceToken.balanceOf(msg.sender), "Not enough ENER tokens in your wallet, please try lesser amount");
    require(governanceToken.allowance(msg.sender, address(this)) >= amount, "Not enough allowance granted to the contract");
    // Check if governmance token pool is enough
    uint predictedTotalStakedGovernanceToken = totalStaked + amount;
    uint predictedTotalGovernanceTokenStakingReward = predictedTotalStakedGovernanceToken * stakingRewardRate / 100;
    
    require(predictedTotalGovernanceTokenStakingReward <= governanceTokenStakingRewardPool, "Staking threshold limit reached.");

    governanceToken.transferFrom(msg.sender, address(this), amount);
    balances[msg.sender] = balances[msg.sender] + amount;
    depositTimestamps[msg.sender] = block.timestamp;
    totalStaked = predictedTotalStakedGovernanceToken;
    
    stakedAddresses.push(msg.sender);

    emit Stake(msg.sender, amount);
  }


  // Withdraw staked governance token
  function withdrawGovernanceToken() public {

    require(balances[msg.sender] > 0 , "You have no ENER balance to withdraw!");
    uint256 balance = balances[msg.sender];
    uint256 stakingReward = 0;
    // Locked staking. Pay reward only if tokens were locked for the lockDuration
    if (block.timestamp > lockDuration + depositTimestamps[msg.sender]) {
      stakingReward = calculateGovernanceTokenStakingReward(msg.sender);
    } else {
      delete depositTimestamps[msg.sender];
    }
    uint256 totalReturn =  stakingReward + balance;
    
    governanceToken.transfer(msg.sender, totalReturn);
    
    totalStaked = totalStaked - balance;
    governanceTokenStakingRewardPool = governanceTokenStakingRewardPool - stakingReward;

    rewards[msg.sender] = 0;
    balances[msg.sender] = 0;
  }

  // Redeem utility token distribution
  function redeemUtilityTokenDistribution() public notCompleted {
    uint256 utilityTokenReward = rewards[msg.sender];
    require(utilityTokenReward > 0 , "No reward to redeem");
    utilityToken.transfer(msg.sender, utilityTokenReward);
    rewards[msg.sender] = 0;
    utilityTokenRewardPoolBalance = utilityTokenRewardPoolBalance - utilityTokenReward;
  }

  // User Balance * APY
  function _calculateGovernanceTokenStakingRewardByAmount(uint256 amount) public view returns (uint256) {
    return amount * stakingRewardRate / 100;
  }

  function calculateGovernanceTokenStakingReward(address user) public view returns (uint256) {
      uint256 balance = balances[user];
      return _calculateGovernanceTokenStakingRewardByAmount(balance);
  }

 function calculateUtilityTokenRewardPct(address user)  public view returns (uint256) {
    if (totalStaked == 0) {
      return 0;
    }
    return balances[user] / totalStaked;
 }

  // Utility Token Reward Pool * User Balance / Total Staked
  function calculateUtilityTokenReward(address user)  public view returns (uint256) {
    if (totalStaked == 0) {
      return 0;
    }
    return utilityTokenRewardPool * calculateUtilityTokenRewardPct(user);
  }

  // Function to allow owner to transfer tokens to this contract
  function distributeUtilityTokenReward(uint256 amount) public {
      require(isAdmin(msg.sender), "Only admin can distribute utility token rewards");
      utilityToken.transferFrom(msg.sender, address(this), amount);
      utilityTokenRewardPool = utilityTokenRewardPoolBalance + amount;
      utilityTokenRewardPoolBalance = utilityTokenRewardPool;
      for (uint256 i = 0; i < stakedAddresses.length; ++i) {
        uint256 utilityTokenReward = calculateUtilityTokenReward(stakedAddresses[i]);
        if (utilityTokenReward > 0) {
          rewards[stakedAddresses[i]] = utilityTokenReward;
        }
      }    
  }

  // Function to allow owner to transfer tokens to this contract
  function addGovernmentTokenReward(uint256 amount) public {
      require(isAdmin(msg.sender), "Only admin can transfer tokens");
      governanceToken.transferFrom(msg.sender, address(this), amount);
      governanceTokenStakingRewardPool = governanceTokenStakingRewardPool + amount;
  }

  // Function to allow owner to remove an admin
  function removeAdmin(address user) public {
      require(msg.sender == owner, "Only owner can add admins");
      delete adminMap[user];
  }

// Function to allow owner to add an admin
  function addAdmin(address user) public {
      require(msg.sender == owner, "Only owner can add admins");
      adminMap[user] = true;
  }

  // Function to allow owner to transfer tokens to this contract
  function reclaimRemainingGovernmentTokenReward() public {
      require(isAdmin(msg.sender), "Only admin can reclaim remaining government token rewards");
      governanceToken.transfer(msg.sender, governanceToken.balanceOf(address(this)));
      governanceTokenStakingRewardPool = 0;
  }

  function isAdmin(address user) public view returns (bool) {
    return adminMap[user];
  }


  receive() external payable {
      emit Received(msg.sender, msg.value);
  }
}