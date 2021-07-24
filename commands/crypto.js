const prefix = powercord.api.commands.prefix;
module.exports = {
    command: 'crypto',
    description: 'A powercord version of ethernet-bot',
    usage: '{c} for more help',
    executor () {
        return{
            send: false,
            result: `\`\`\`diff
+ Current Prefix is ${prefix}
- // Basic Commands: // 
${prefix}crypto - This message
${prefix}rate [crypto] [fiat(s)] - Prints current cryptocurrency pricing. Separate fiats using a comma.
${prefix}convert [amount] [fiat] [crypto] - Exchanges fiat currencies to crypto. 
${prefix}chart [crypto] [days] - Prints an ASCII price history chart.
${prefix}list - Lists available fiats and cryptos, that can be used in ${prefix}rate and ${prefix}convert.
${prefix}donate - Lists crypto donation addresses for powercord-crypto ;)
- // Configuration: //
All settings can be configured in the plugin settings tab.
\`\`\``

}
    }
};