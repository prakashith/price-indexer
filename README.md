# price-indexer

![](https://img.shields.io/npm/dt/price-indexer.svg?style=for-the-badge&labelColor=000000) ![](https://img.shields.io/github/languages/code-size/prakashith/price-indexer?style=for-the-badge&labelColor=000000) ![](https://img.shields.io/npm/l/price-indexer?style=for-the-badge&labelColor=000000) ![](https://img.shields.io/github/package-json/v/prakashith/price-indexer?style=for-the-badge&labelColor=000000) <a aria-label="NPM version" href="https://www.npmjs.com/package/price-indexer"> <img alt="" src="https://img.shields.io/npm/v/next.svg?style=for-the-badge&labelColor=000000"> </a>

Developed by: [**Jay Rank**](https://github.com/RankJay)

## Introduction
`price-indexer` is a SDK built to fetch price feed data from Chainlink Oracles over EVM-compatible blockchains as well as from DIA Org over NEAR blockchain.

For installation, refer [here](https://www.npmjs.com/package/price-indexer) or run the following command in your node project.

```
npm install price-indexer
```

## How to use

**1. Fetch Latest Price for `ETH-USD` from [Chainlink Oracles](https://data.chain.link/)**

This function returns the value of 1 Ethreum in terms of USD currency.
- Use this function when you simply want to fetch `ETH-USD` conversion.

```js
const PriceIndexer = require('price-indexer');

let networkName = 'mainnet'; // Only works on 'mainnet' network over EVM.
let fetchPriceIndex;

async function getLatestPriceFeed() {
	fetchPriceIndex = await new PriceIndexer(networkName).basePrice();
	console.log(fetchPriceIndex);
}


getLatestPriceFeed();
```

<br>

**2. Fetch Latest Price for any asset from [Chainlink Oracles](https://data.chain.link/)**

This function returns the value of one asset/cryptocurrency in terms of other asset/cryptocurrency (e.g. in `FTM-ETH` oracle, index of 1 FTM in terms of ETH is returned).
- Use this function when you want to fetch any asset except `USD`.
- If the base assset is not `USD`,  you can get the price in `USD` by setting the value tertiary variable `false`.
	- For example: If the address holds for `FTM-ETH`, you can get the price in `USD` instead of `ETH` by setting the value tertiary variable `false`.

```js
const PriceIndexer = require('price-indexer');

let networkName = 'mainnet'; // 'mainnet', 'rinkeby', 'ropsten'
let oracleContractAddress = '0x2DE7E4a9488488e0058B95854CC2f7955B35dC9b'; // FTM-ETH oracle contract address
// Visit https://data.chain.link/ to find options for specific token/asset for oracle contract addresses.
let fetchPriceIndex;

async function getLatestPriceFeed() {
	fetchPriceIndex = await new PriceIndexer(networkName, oracleContractAddress, false).assetPrice();
	console.log(fetchPriceIndex);
}


getLatestPriceFeed();
```

<br>

**3. Fetch Latest Price for any asset from [DIA Org](https://diadata.org)**

This function returns the value of one asset/cryptocurrency directly via DIA Data APIs. Read more about these APIs [here](https://docs.diadata.org/documentation/api-1/api-endpoints#coins).

- Use this function when you simply want to fetch latest price from DIA Data APIs.

```js
const PriceIndexer = require('price-indexer');

let assetName = 'FTM' // Visit https://docs.diadata.org to find more options for retriving price index of an asset.
let fetchPriceIndex;

async function getLatestPriceFeed() {
	fetchPriceIndex = await new PriceIndexer(...[null, null, null], assetName).priceDIAData()
	console.log(fetchPriceIndex);
}

getLatestPriceFeed();
```

<br>

**4. Fetch Latest Price for any asset from [Messari](https://messari.io/)**

This function returns the value of one asset/cryptocurrency directly via Messari Data APIs. Read more about these APIs [here](https://messari.io/api).

- Use this function when you simply want to fetch latest price from Messari Data APIs.

```js
const PriceIndexer = require('price-indexer');

let assetName = 'FTM' // Visit https://messari.io/api to find more options for retriving price index of an asset.
let fetchPriceIndex;

async function getLatestPriceFeed() {
	fetchPriceIndex = await new PriceIndexer(...[null, null, null], assetName).priceMESSARIData()
	console.log(fetchPriceIndex);
}

getLatestPriceFeed();
```