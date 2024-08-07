// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EnerToken is ERC20 {
    constructor() ERC20("Ener", "ENER") {
        _mint(msg.sender, 20* 10 ** decimals());
    }
}


