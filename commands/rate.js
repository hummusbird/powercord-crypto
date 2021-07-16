const path = require('path')
const { SymbolToID, diffred, } = require(path.resolve(__dirname, 'functions.js'))
module.exports = {
    command: 'rate',
    description: 'Prints current rates of a crypto against mutliple fiats.',
    usage: '{c} [crypto] [fiat(s)]',
    executor (args) {
        if (!args[0]) {
            return{
                send: false,
                result: diffred('Please enter a cryptocurrency')
            }
        }
        if (!args[1]) { fiat = powercord.pluginManager.get("powercord-crypto").settings.get('defaultFiat', 'usd,gbp,eur') }

        var crypto = SymbolToID(args[0])
        if (crypto == -1) {return { send: false, result: diffred("Please reinstall the plugin.")}}
        var fiatArray = fiat.split(',')
        var fiat = fiat.replace(',', '%2C')

        return{
            send: false,
            result: crypto
        }
    }
};