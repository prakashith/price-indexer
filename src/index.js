const Web3 = require("web3")
const axios = require('axios')

class CustomError extends Error {  
	constructor (message) {
		super(message)
		this.name = this.constructor.name
		this.status = 404
		this.sendError(message)
	}

		sendError(message) {
		console.log(message)
		process.exit(1)
	}
}

class PriceOracle {
	aggregatorV3InterfaceABI = [{ "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "description", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "getRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]
	addrETHtoUSD = '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419'
	supportingNetworks = ['mainnet', 'ropsten', 'kovan', 'rinkeby', 'goerli']

	constructor(network = null, addressOfPriceOracle = this.addrETHtoUSD, baseUSD = true, assetName = null) {
		if (assetName != null) {
			this.assetName = assetName
		}
		else {
			this.network = this.supportingNetworks.includes(network) ? network : console.log(new CustomError('Enter Valid Netwrok!').sendError)
			this.web3 = new Web3("https://" + network + ".infura.io/v3/34ed41c4cf28406885f032930d670036")
			this.addressOfPriceOracle = addressOfPriceOracle;
			this.baseUSD = baseUSD;
		}
	}

	priceDIAData = async () => {
		try {
			return await axios.get('https://api.diadata.org/v1/quotation/' + this.assetName)
				.then(res => res.data['Price']).catch(err => console.log("Invalied response. Please enter the correct asset name!. StackTrace here:\n" + err))
		}
		catch (e) {
			console.log("Invalied response. Please enter the correct asset name!")
		}
	}

	basePrice = async () => {
		try {
			const fetchLatestDataETHtoUSD = new this.web3.eth.Contract(this.aggregatorV3InterfaceABI, this.addressOfPriceOracle)
			const latestDataETHtoUSD = await fetchLatestDataETHtoUSD.methods.latestRoundData().call()
			// latestDataETHtoUSD.methods.latestRoundData().call().then((ETHToUSD) => {
			// 	console.log("Latest ETHToUSD Data", ETHToUSD)
			// })
			return parseFloat(latestDataETHtoUSD['answer']) / 100000000
		}

		catch (e) {
			console.log('Encountered an error, you migh want to recheck the entered address!')
			return null;
		}
	}

	assetPrice = async () => {
		try {
			const fetchLatestPriceFeed = new this.web3.eth.Contract(this.aggregatorV3InterfaceABI, this.addressOfPriceOracle)
			const latestPriceFeed = await fetchLatestPriceFeed.methods.latestRoundData().call()

			if (this.baseUSD != true) {
				let conversionDataETHtoUSD = await this.basePrice()

				return ((parseFloat(latestPriceFeed['answer']) / 1000000000000000000) * conversionDataETHtoUSD)
			}
			// latestPriceFeed.methods.latestRoundData().call().then((roundData) => {
			// 	// console.log("Latest Round Data", roundData)
			// })
			return parseFloat(latestPriceFeed['answer'] / 100000000)
		}

		catch (e) {
			console.log('Encountered an error, you migh want to recheck the entered address!')
			return null;
		}
	}
}

module.exports = PriceOracle;