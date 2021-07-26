const prefix = powercord.api.commands.prefix;
const fs = require('fs')
const path = require('path')
const lineheight = 25
module.exports = {
    command: 'crypto',
    description: 'A powercord version of ethernet-bot',
    usage: '{c} for more help',
    async executor (args) {
        if (!args[0] || args[1] == "help"){
        return{
            send: false,
            result: `\`\`\`diff
+ Current Prefix is ${prefix}
- // Basic Commands // 
${prefix}crypto - This message
${prefix}rate [crypto] [fiat(s)] - Prints current cryptocurrency pricing. Separate fiats using a comma.
${prefix}convert [amount] [fiat] [crypto] - Exchanges fiat currencies to crypto. 
${prefix}chart [crypto] [days] - Prints an ASCII price history chart.
${prefix}crypto list crypto/fiat [page] - Lists available fiats and cryptos.
${prefix}crypto donate - Lists crypto donation addresses for powercord-crypto ;)
- // Configuration //
All settings can be configured in the plugin settings panel.
\`\`\``

}
        }
        else if (args[0] == "list" && args[1] == "fiat"){
            var page = 1
            if (args[2] && parseInt(args[2])) {page = parseInt(args[2])}
            var data = fs.readFileSync(path.resolve(__dirname, '../data/fiat.txt'), 'utf8')
            var dataArray = data.split('\n')
            var lines = "";
            for (let i = 0; i < lineheight; i++) {
                fiat = dataArray[i + ((page - 1) * lineheight)]
                if (fiat) {lines = lines + fiat + '\n'}                
            }
            if (lines == "") {return{send: false, result: '```diff\n- End of fiat currencies.```'}}
            return{
                send: false,
                result: `\`\`\`diff\n- Fiat currencies // Page ${page} of ${Math.ceil(dataArray.length/lineheight)}\n${lines}\`\`\``
            }
        }
        else if (args[0] == "list" && args[1] == "crypto"){
            var page = 1
            if (args[2] && parseInt(args[2])) {page = parseInt(args[2])}
            var data = fs.readFileSync(path.resolve(__dirname, '../data/crypto.txt'), 'utf8')
            var dataArray = data.split('\n')
            var lines = "";
            
            for (let i = 0; i < lineheight; i++) {
                cryptocurrency = dataArray[i + ((page - 1) * lineheight)]
                if (cryptocurrency) {lines = lines + cryptocurrency + '\n'}
                console.log(cryptocurrency)                
            }
            if (lines == "") {return{send: false, result: '```diff\n- End of cryptocurrencies.```'}}
            return{
                send: false,
                result: `\`\`\`diff\n- Cryptocurrencies // Page ${page} of ${Math.ceil(dataArray.length/lineheight)}\n${lines}\`\`\``
            }
        }
        else if (args[0] == "list" && !args[1]){
            return{ 
                send: false,
                result: `\`\`\`diff\n- Please use ${prefix}crypto list fiat or ${prefix}crypto list crypto\`\`\``
            } 
        }
        else if (args[0] == "donate") {
            return{
                send: false,
                result: '```diff\n+ Donate to powercord-crypto!\nETH - 0x2D71e8Bf5181A18D50eB5D62e47c5338c2803d30\nBTC - bc1qlg22k2934ad8jp0rjje3n2n57vayd2uev595al\nDOGE - D6EVKV79oHCwz5xcqr76xscCohh4Wm8EMT\nRVN - RUMBVuCnBdRCdqUKoDu5HfxMYr5DMUEnvv\nETC - 0x599761676506E9a3BC1b9623C57f004a665a73D6```'
            }	
        }
        else {
            return{
                send: false,
                result: `\`\`\`diff\n- Invalid command. Run ${prefix}crypto for help.\`\`\``
            }
        }
    }
};