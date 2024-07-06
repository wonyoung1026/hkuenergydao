require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.24",
    paths: {
        artifacts: "./src",
    },
    networks: {
        zkEVM_Cardona: {
            url: `https://rpc.cardona.zkevm-rpc.com`,
            accounts: [process.env.ACCOUNT_PRIVATE_KEY],
        },

        zkEVM_Mainnet: {
            url: `https://zkevm-rpc.com`,
            accounts: [process.env.ACCOUNT_PRIVATE_KEY],
        },

    },
};
