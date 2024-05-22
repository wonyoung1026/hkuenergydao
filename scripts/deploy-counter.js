const hre = require("hardhat");

async function main() {
    // 자동으로 ./contracts/Counter.sol 에서 읽는듯
    const deployedContract = await hre.ethers.deployContract("Counter");
    await deployedContract.waitForDeployment();
    console.log(deployedContract)
    console.log(
        `Counter contract deployed to https://explorer.public.zkevm-test.net/address/${deployedContract.target}`
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
