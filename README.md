# MMX ERC20 Token

# Local development

## Prerequisites

- [node v15.11.0](https://www.npmjs.com/package/node/v/15.11.0) or higher
- [hardhat v2.9.3](https://www.npmjs.com/package/hardhat/v/2.9.3)
- [solidity v0.8.16](https://github.com/ethereum/solidity/releases/tag/v0.8.16)

## .ENV

Setup .env file

- `INFURA_KEY` - infura api key for upload contracts to network
- `PRIVATE_KEY` - admin private key
- `ETHERSCAN_API_KEY` - etherscan api key for verify contracts
- `TOKEN_NAME` - token name
- `TOKEN_SYMBOL` - token symbol
- `BLOCK_AMOUNT` - number of blocks with transfer limit (default = 1)
- `MMX_ADDRESS` - MMX contract address
- `OWNER_ADDRESS` - Owner address
- `TO_ADDRESS` - mint TO this address

* Install the dependencies

```
npm i
```

- Run the tests

```
npx hardhat test
```

- Compile the contracts

```
npx hardhat compile
```

# Quick Start

To compile and deploy contracts to any Network fill in `.env` by example `.env.example` and run:

1. Deploy script

```
npx hardhat run scripts/deploy.js --network NAME
```

2. Verify

```
npx hardhat run scripts/verify-mmx.js --network NAME
```

# Usage

Contracts are processed in the following stages:

1. Compilation
2. Deployment
3. Configuration
4. Interactions on-chain

## Compilation

To compile the contracts run:

```
npx hardhat compile
```

Artifacts are stored in the `artifacts` and directory.

## Deployment

For deployment step the following command should be used:

```
npx hardhat run scripts/deploy.js --network NAME
```

_Addresses of deployed contracts are displayed in terminal._

# Testing

If you'd like to run tests on the local environment, you might want to run tests using the following command:

```
npx hardhat test

```

# Transfer Ownership

For transfer ownership the following command should be used:

```
npx hardhat transferOwnership --newOwner NEW_ADDRESS --network NAME
```

# List of useful commands

```
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts
TS_NODE_FILES=true npx ts-node scripts/deploy.ts
npx eslint '**/*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
npx hardhat test --network localhost
npx hardhat run scripts/deploy.ts --network localhost
npx hardhat verify --constructor-args arguments.js CONTRACT_ADDRESS
```
