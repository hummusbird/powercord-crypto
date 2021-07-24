const path = require('path');
const { SymbolToID, diffred, diff, contactAPI } = require(path.resolve(__dirname, 'functions.js'))
module.exports = {
    command: 'rate',
    description: 'Prints current rates of a crypto against mutliple fiats.',
    usage: '{c} [crypto] [fiat(s)]',
    async executor (args) {
        var crypto = SymbolToID(powercord.pluginManager.get("powercord-crypto").settings.get('defaultCrypto', 'bitcoin'))
        if (args[0]){
            crypto = SymbolToID(args[0])
        }
        if (crypto == -1) {return { send: false, result: diffred("Please reinstall the plugin.")}}

        if (!args[1]) { fiat = powercord.pluginManager.get("powercord-crypto").settings.get('defaultFiat', 'usd,gbp,eur') }
        else { fiat = args[1].toLowerCase() }

        var fiatArray = fiat.split(',')
        var fiat = fiat.replace(',', '%2C')

        var APIdata = await contactAPI(crypto, fiat)

        if (typeof APIdata == typeof []){ //If the API returns an array, success.
					
            var returnString = `- ${crypto.toUpperCase()} RATE` //Add title

            var percent = APIdata[0][crypto][fiatArray[0]+"_24h_change"]
            var percentSign = ""
            if (percent > 0) { percentSign = "+ " }
            else if (percent < 0) { percentSign = "- "; percent *= -1 } //Calculate whether % change is + or -

            returnString += `\n${percentSign}${Math.round(percent * 100) / 100}% 24H CHANGE` //Add 24hr change

            for (var i = 0; i < fiatArray.length; i++){
                if ( !APIdata[0][crypto][fiatArray[i]] ){ returnString += (`\n- "${fiatArray[i]}" is an invalid currency!`) } //Invalid currency
                else {returnString += `\n1 ${crypto} = ${APIdata[0][crypto][fiatArray[i]]} ${fiatArray[i].toUpperCase()}`} //Valid currency
            }
            returnString += `\n+ Information from coingecko at ${APIdata[1]}` //Add time

            return{
                send: powercord.pluginManager.get("powercord-crypto").settings.get('public', 'false'), //Only send if public messaged enabled
                result: diff(returnString)
            }

        }
        else{ //If the API returns a string, it's an error code to print.
            return{
                send: false,
                result: diffred(APIdata)
            }
        }
    }
};