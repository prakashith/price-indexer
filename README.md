# price-indexer

## Introduction
`price-indexer` is a SDK built to fetch price feed data from Chainlink Oracles.

For installation, refer [here](https://www.npmjs.com/package/price-indexer) or run the following command in your node project.

```
npm install price-indexer
```

## How to use

**1. Fetch Latest Price for `ETH-USD`**

This function returns the value of 1 Ethreum in terms of USD currency.
- Use this function when you simply want to fetch `ETH-USD` conversion.

```js
const price-indexer = require('price-indexer');

let network-name = 'mainnet'; // Only works on 'mainnet' network over EVM.
let fetchPriceIndex;

async function getLatestPriceFeed() {
	fetchPriceIndex = await new price-indexer.PriceOracle(network-name).basePrice();
	console.log(fetchPriceIndex);
}


getLatestPriceFeed();
```

<br>

**2. Fetch Latest Price for any asset**

This function returns the value of one asset/cryptocurrency in terms of other asset/cryptocurrency (e.g. in `FTM-ETH` oracle, index of 1 FTM in terms of ETH is returned).
- Use this function when you want to fetch any asset except `USD`.
- If the base assset is not `USD`,  you can get the price in `USD` by setting the value tertiary variable `false`.

```js
const price-indexer = require('price-indexer');

let network-name = 'mainnet'; // 'mainnet', 'rinkeby', 'ropsten'
let oracle-contract-address = '0x2DE7E4a9488488e0058B95854CC2f7955B35dC9b'; // FTM-ETH oracle contract address
// Visit https://data.chain.link/ to find options for specific token/asset for oracle contract addresses.
let fetchPriceIndex;

async function getLatestPriceFeed() {
	fetchPriceIndex = await new price-indexer.PriceOracle(network-name, oracle-contract-address, false).assetPrice();
	console.log(fetchPriceIndex);
}


getLatestPriceFeed();
```