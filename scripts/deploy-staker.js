const hre = require("hardhat");

async function main() {
    // 자동으로 ./contracts/Staker.sol 에서 읽는듯
    const stakingRewardRate = 10; // 10%
    const deployedContract = await hre.ethers.deployContract("Staker", [
        process.env.REACT_APP_ENER_TOKEN_CONTRACT_ADDRESS,
        process.env.REACT_APP_KWH_TOKEN_CONTRACT_ADDRESS,
        stakingRewardRate,
    ]);
    await deployedContract.waitForDeployment();
    console.log(deployedContract)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
