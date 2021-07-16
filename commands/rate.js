const powercord = require('powercord/');
const { Plugin } = require('powercord/entities');
const { getModule, React } = require('powercord/webpack');
const Settings = require('../components/Settings');
module.exports = {
    command: 'rate',
    description: 'Prints current rates of a crypto against mutliple fiats.',
    usage: '{c} [crypto] [fiat(s)]',
    executor (args) {
        if (!args[0]) {
            return{
                send: false,
                result: `\`\`\`diff\n- Please enter a cryptocurrency\`\`\``
            }
        }
        console.log(this)
        if (!args[1]) { fiat = powercord.api.settings.getSettings('defaultFiat', 'usd,gbp,eur') }
        
        return{
            send: false,
            result: fiat
        }
    }
};