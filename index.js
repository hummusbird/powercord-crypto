const { Plugin } = require('powercord/entities');
const fs = require('fs')
const asciichart = require('asciichart')
const path = require('path')

const prefix = powercord.api.commands.prefix;
const defaultApi = 'coingecko'
const defaultFiat = 'usd,gbp,eur'

module.exports = class Crypto extends Plugin {
	
	async startPlugin() {
		powercord.api.commands.registerCommand({
			command: 'crypto',
			description: 'A powercord version of ethernet-bot',
			usage: '{c} for more help',
			executor: this.handleCommand.bind(this)
		});
	}

	pluginWillUnload() {
		powercord.api.commands.unregisterCommand('crypto');
	}

	async handleCommand (args) {
		switch(args[0]){
			case "rate":
				if (!args[1]){
					return{
						send: false,
						result: `\`\`\`diff\n- Please enter a cryptocurrency\`\`\``
				}}
				if (!args[2]){ fiat = defaultFiat }
				else { fiat = args[2].toLowerCase() }

				var crypto = SymbolToID(args[1])
				var fiatArray = fiat.split(',')
				var fiat = fiat.replace(',','%2C')

				var APIdata = await contactAPI(crypto, fiat)

				if (typeof APIdata == typeof []){ //If the API returns an array, success.
					
					var returnString = `- ${crypto.toUpperCase()} RATE`

					var percent = APIdata[0][crypto][fiatArray[0]+"_24h_change"]
					var percentSign = ""
					if (percent > 0) { percentSign = "+ " }
					else if (percent < 0) { percentSign = "- "; percent *= -1 }

					returnString += `\n${percentSign}${Math.round(percent * 100) / 100}% 24H CHANGE`

					for (var i = 0; i < fiatArray.length; i++){
						if ( !APIdata[0][crypto][fiatArray[i]] ){returnString += (`\n- "${fiatArray[i]}" is an invalid currency!`)} //Invalid currency
						else {returnString += `\n1 ${crypto} = ${APIdata[0][crypto][fiatArray[i]]} ${fiatArray[i].toUpperCase()}`} //Valid currency
					}

					returnString += `\n+ Information from coingecko at ${APIdata[1]}` //Add time

					return{
						send: true,
						result: `\`\`\`diff\n${returnString}\`\`\``
					}

				}
				else{ //If the API returns a string, it's an error code to print.
					return{
						send: false,
						result: APIdata
					}
				}
				
			case "convert":
				var value = args[1]
				var fiat = args[2]
				var crypto = args[3]

				var convertString = ""

				if (!value){
					return{
						send: false,
						result: `\`\`\`diff\n- Please enter an amount.\`\`\``
					}
				}
				if (!fiat){ fiat = "usd" }
				if (!crypto){ crypto = "bitcoin" }

				crypto = SymbolToID(crypto)

				var APIdata = await contactAPI(crypto, fiat)

				if (typeof APIdata == typeof []){
					try{
						var amount = parseFloat(value)
						if (isNaN(amount)){ //Checks if either the inputted number is NaN (number is not valid)
							throw(`"${value}" is not a valid number!`)
						}
						else if (isNaN(APIdata[0][crypto.toLowerCase()][fiat.toLowerCase()])){ //Checks if the returned data is NaN (currency is not valid)
							throw(`"${fiat}" is not a valid currency!`)
						}

						convertString += `- CONVERT ${amount} ${fiat.toUpperCase()} TO ${crypto.toUpperCase()}`
						convertString += `\n\n${amount} ${fiat.toUpperCase()} is worth ${(1/APIdata[0][crypto.toLowerCase()][fiat.toLowerCase()]) * amount} ${crypto}`
						convertString += `\n\n+ Information from coingecko at ${APIdata[1]}`
					}
					catch (e){
						return{
							send: false,
							result: `\`\`\`diff\n- ${e}\`\`\``
						}
					}
				}
				else{
					return{
						send: false,
						result: `\`\`\`diff\n- ${APIdata}\`\`\``
					}
				}

				return{
					send: true,
					result: `\`\`\`diff\n${convertString}\`\`\``
				}

			case "chart":
				var days = 14
				if (!args[1]){
					return{
						send: false,
						result: `\`\`\`diff\n- Please enter a cryptocurrency\`\`\``
					}
				}
				if ( args[2] && !isNaN(parseInt(args[2])) ){ var days = args[2] }

				var crypto = SymbolToID(args[1])

				var chartContents = await chart(crypto, days)
				
				if (typeof chartContents == typeof []){ //if chartContents is an array, API success and print chart.
					require('powercord/webpack').getModule([ 'sendMessage' ], false).sendMessage(require('powercord/webpack').channels.getChannelId(), { content: `\`\`\`\n${chartContents[0]}\`\`\`` });
					return{
						send: true,
						result: chartContents[1]
					}
				}
				else{
					return{
						send: false,
						result: `\`\`\`diff\n- ${chartContents}\`\`\``
					}
				}

			case "list":
				const { upload } = await require('powercord/webpack').getModule([ 'cancel', 'upload', ]);
				const { makeFile } = await require('powercord/webpack').getModule([ 'classifyFile', 'makeFile' ]);

				if (args[1] == "crypto"){
					var data = fs.readFileSync(path.resolve(__dirname, 'crypto.txt'), 'utf8');   
					upload(require('powercord/webpack').channels.getChannelId(), makeFile(data, 'crypto.txt', false), null);
					return false;
				}
				else if (args[1] == "fiat"){
					var data = fs.readFileSync(path.resolve(__dirname, 'fiat.txt'), 'utf8')  
					upload(require('powercord/webpack').channels.getChannelId(), makeFile(data, 'fiat.txt', false), null);
					return false;
				}
				else{
					return{
						send: false,
						result: "\`\`\`diff\n- Please use .crypto list fiat or .crypto list crypto\`\`\`"
					}
				}		
			case "donate":
				return{
					send: false,
					result: `\`\`\`diff\n+ Donate to powercord-crypto!\nETH - 0x2D71e8Bf5181A18D50eB5D62e47c5338c2803d30\nBTC - bc1qlg22k2934ad8jp0rjje3n2n57vayd2uev595al\nDOGE - D6EVKV79oHCwz5xcqr76xscCohh4Wm8EMT\nRVN - RUMBVuCnBdRCdqUKoDu5HfxMYr5DMUEnvv\nETC - 0x599761676506E9a3BC1b9623C57f004a665a73D6\`\`\``
				}	
			
			case "help":
			default:
				return{
					send: false,
					result: `\`\`\`diff
+ Current Prefix is ${prefix}crypto
- // Basic Commands: // 
${prefix}crypto help - This message
${prefix}crypto rate [crypto] [fiat(s)] - Prints current cryptocurrency pricing. Separate fiats using a comma.
${prefix}crypto convert [amount] [fiat] [crypto] - Exchanges fiat currencies to crypto. 
${prefix}crypto chart [crypto] [days] - Prints an ASCII price history chart. Defaults to 14 days.
${prefix}crypto list - Lists available fiats and cryptos, that can be used in ${prefix}rate and ${prefix}convert.
${prefix}crypto donate - Lists crypto donation addresses for powercord-crypto ;)\`\`\``
}
		}

		function SymbolToID(short){
			try{
				short = short.toLowerCase();
				var data = fs.readFileSync(path.resolve(__dirname, 'crypto.json'), 'utf8')
				const json = JSON.parse(data) 
				for (var i = 0; i < json.length; i++){
					if (short == json[i]["symbol"]){
						return json[i]["id"]
					}
				}
				return short
			}
			catch (e){
				console.log("Error reading file. Please reinstall the plugin")
				return(-1);
			}

		}

		async function contactAPI(crypto, fiat) {
			try{
				let res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=${fiat}&include_24hr_change=true&include_last_updated_at=true`)
				let parsed = await res.json()
				if (parsed && parsed["error"]){ //API error
					throw(parsed["error"])
				}
				else{ //API success
					try{
						var date = new Date((parsed[crypto]["last_updated_at"]) * 1000) //Converts EPOCH time from API to standard date-time format
						
						return [parsed,date]                   
					}
					catch{
						return(`"${crypto}" is not a valid crypto!`)
					}
				}
			}
			catch (error){
				console.log(error)
				return(error)
			}
		}

		async function chart(crypto, days){
			try{
				let res = await fetch(`https://api.coingecko.com/api/v3/coins/${crypto}/market_chart?vs_currency=usd&days=${days}`)
				let parsed = await res.json()
				if (parsed && parsed["error"]){ //API error
					throw(parsed["error"])
				}
				else{ //API success
					var apiLength = parsed["prices"].length - 1
					
					var s0 = new Array (100)
					for (var i = 0; i < s0.length; i++)
						s0[s0.length - 1 - i] = parsed["prices"][Math.floor(apiLength - i * apiLength/100)][1]
					var chart = (asciichart.plot (s0, { height: 15, padding: '' }))
		
					var percent = (((s0[s0.length - 1] - s0[0] ) / s0[0]) * 100).toFixed(2);
					if (percent < 0){
						percent = percent * -1
						percent = "- " + percent
					}
					else{ percent = "+ " + percent} 
					var pricechange = `${percent}%`
					
					
					var subtext = (`\`\`\`diff\n- ${crypto.toUpperCase()} PRICE // LAST ${days} DAYS // PEAKS ARE NOT EXACT\n1 ${crypto.toUpperCase()} = $${Math.round(s0[s0.length - 1] * 100) / 100} USD\n${pricechange} CHANGE OVER ${days} DAYS\n+ Information from ${defaultApi} at ${new Date()}\`\`\``)
		
					return([chart,subtext])
				}
			}
			catch (error){
				console.log(error)
				return(error)
			}
		}
	}
};
