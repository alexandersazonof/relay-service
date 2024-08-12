# Relay Service

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Tests preparation

For e2e testing, you will need to run the blockchain locally. To avoid the need to deploy all contracts locally, the project also includes contracts necessary for development and testing.

The contracts are copied without changes, with the only exception being the addition of custom data, such as adding an operator to the sacra-relay contract.
There may also be additional contracts (e.g. a counter contract) for testing a suite of contracts.

Before running tests related to the local blockchain, you need to start Hardhat:

```bash
# run hardhat node
$ yarn run hardhat
```

```bash
# compile contracts
$ yarn run compile
```

```bash
# deploy contracts (should log addresses)
$ yarn run deploy
```

## Test

For e2e tests will be used environment variables from **env.test**. 
Some variables in this file need to be changed as needed. For example, contract addresses need to be changed after each deployment.

Also, your Node.JS version must have native support for reading from .env files (version must be **20.6.0** or higher)

### Relay (e2e)

```bash
# e2e tests (relay only)
$ yarn run test:e2e:relay
```

### All tests (e2e)

```bash
# e2e tests
$ yarn run test:e2e
```
