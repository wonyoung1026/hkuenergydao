// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract UtilToken is ERC20 {
    constructor() ERC20("UtilToken", "KWH") {
        _mint(msg.sender, 10* 10 ** decimals());

    }
}
