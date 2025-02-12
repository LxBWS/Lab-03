# LxBWS - Lab03

Support material for the Lisbon Blockchain Winter School (Lab 03)

Slides [here](https://drive.google.com/drive/folders/1fxPBCplE0fZyLSNnAXb6cMsrV8XYCH0I)

## Description

Practice: implement the registration contract for the Lisbon Blockchain Winter School,
and integrate with the LXBWS token contract.

### Dependencies
* Hardhat (v2.22.18)
* Node (v18)

### Requirements
* Run a testing blockchain node, or set up a connection to a test blockchain.
* We suggest using hardhat:

```shell
npx hardhat node
```


### Let's start

* Use the template provided to create the Registration contract in [Registration](./contracts/Registration.sol)

### Installing dependencies, compiling contracts and running tests

```shell
npm i
npx hardhat compile
npx hardhat test
```

### Implement the Registration
* Implement the contract until all tests pass

### Deploy your first Smart Contract

* Connect your local environment to Remix
* Open the LXBWS contract
* Select the Solidity compiler
* Compile the contract
* Click “Deploy and run transactions”
* Connect the environment to the running blockchain
* Deploy the contract
* Open the Registration contract
* Select the Solidity compiler
* Compile the contract
* Click “Deploy and run transactions”
* Deploy the Registration contract passing as arguments the address of the LXBWS token contract and the initial registration fee

Note that before registering a user, the user needs to approve the Registration contract to spend the amount of tokens necessary for the registration fee. Thus:
1. First, mint some tokens to the user
2. Approve the Registration contract to spend the amount of tokens necessary for the registration fee
3. Register the user in the Registration contract

## Authors

* [David R. Matos](https://github.com/davidmatos)
* [André Augusto](https://github.com/AndreAugusto11)
