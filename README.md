## Getting Started

Clone the repository:

```
git clone https://github.com/wonyoung1026/hkuenergydao.git
```

## Getting Started



Run in Local Environment:

```
npm install --legacy-peer-deps
npm start
```

Run in Production:

```
npm build
```


### Example of deploying a new smart contract
```
npx hardhat compile
npx hardhat run scripts/deploy-counter.js --network zkEVM
```

Note you need to set `ACCOUNT_PRIVATE_KEY` and `INFURA_API_KEY` in .env file
