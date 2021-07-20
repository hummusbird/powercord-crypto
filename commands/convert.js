const { SymbolToID, diffred, contactAPI } = require(path.resolve(__dirname, 'functions.js'))
module.exports = {
    command: 'convert',
    description: 'converts specific fiat amounts into crypto',
    usage: '{c} [amount] [fiat] [crypto]',
    async executor (args) {
        var value = args[0]
        var fiat = args[1]
        var crypto = args[2]

        var convertString = ""

        if (!value) {
            return{
                send: false,
                result: diffred("Please enter an amount.")
            }
        }
        if (!fiat) { 
            defaultFiats = powercord.pluginManager.get("powercord-crypto").settings.get('defaultFiat', 'usd,gbp,eur') 
            fiatArray = defaultFiats.split(',')
            fiat = fiatArray[0]
        }
        if (!crypto) {
            crypto = powercord.pluginManager.get("powercord-crypto").settings.get('defaultCrypto', 'bitcoin')
        }
        
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
                    result: diffred(`${e}`)
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
    }
}