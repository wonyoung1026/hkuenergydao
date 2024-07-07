## Getting Started

Clone the repository:

```
git clone https://github.com/wonyoung1026/hkuenergydao.git
```

## Getting Started



Run in Local Environment:

```
npm install
npm start
```

Run in Production:

```
npm build
```


### Example of deploying a new smart contract
```
npx hardhat compile
npx hardhat run scripts/deploy-staker.js --network zkEVM_Cardona
```

Note you need to set the below env vars in .env file
```
INFURA_API_KEY
ACCOUNT_PRIVATE_KEY
REACT_APP_ENER_TOKEN_CONTRACT_ADDRESS
REACT_APP_KWH_TOKEN_CONTRACT_ADDRESS
REACT_APP_STAKER_CONTRACT_ADDRESS
```
