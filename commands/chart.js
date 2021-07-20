const path = require('path')
const asciichart = require('asciichart')
const { SymbolToID, diffred } = require(path.resolve(__dirname, 'functions.js'))
module.exports = {
    command: 'chart',
    description: 'Prints an ASCII chart of a specified cryptocurrency',
    usage: '{c} [crypto] [days]',
    async executor (args) {
        var days = 14
        if (!args[0]){
            return{
                send: false,
                result: diffred("Please enter a cryptocurrency!")
            }
        }
        if ( args[1] && !isNaN(parseInt(args[1])) ) { var days = args[1] } //checks if days supplied

        var crypto = SymbolToID(args[0])
        if (crypto == -1) {return { send: false, result: diffred("Please reinstall the plugin.")}}

        var chartContents = await chart(crypto, days)

        if (typeof chartContents == typeof []){ //if chartContents is an array, API success and print chart.
            if (powercord.pluginManager.get("powercord-crypto").settings.get('public', 'false')) { //if public true
                require('powercord/webpack').getModule([ 'sendMessage' ], false).sendMessage(require('powercord/webpack').channels.getChannelId(), { content: chartContents[0] });
                return{
                    send: true,
                    result: chartContents[1]
                }
            }
            else {
                return{
                    send: false,
                    result: `${chartContents[0]}${chartContents[1]}`
                }
            }

        }
        else{
            return{
                send: false,
                result: diffred(chartContents)
            }
        }
    }
}

async function chart(crypto, days){
    try{
        let res = await fetch(`https://api.coingecko.com/api/v3/coins/${crypto}/market_chart?vs_currency=usd&days=${days}`)
        let parsed = await res.json()
        if (parsed && parsed["error"] || !parsed){ //API error
            throw("Error contacting API!")
        }
        else{ //API success
            var apiLength = parsed["prices"].length - 1
            
            var s0 = new Array (100)
            for (var i = 0; i < s0.length; i++)
                s0[s0.length - 1 - i] = parsed["prices"][Math.floor(apiLength - i * apiLength/100)][1]
            var chart = (`\`\`\`${asciichart.plot (s0, { height: 15, padding: '' })}\`\`\``)
            if (!chart) { throw("Please install asciichart depedency") }
            var percent = (((s0[s0.length - 1] - s0[0] ) / s0[0]) * 100).toFixed(2);
            if (percent < 0){
                percent = percent * -1
                percent = "- " + percent
            }
            else{ percent = "+ " + percent} 
            var pricechange = `${percent}%`
            
            
            var subtext = (`\`\`\`diff\n- ${crypto.toUpperCase()} PRICE // LAST ${days} DAYS // PEAKS ARE NOT EXACT\n1 ${crypto.toUpperCase()} = $${Math.round(s0[s0.length - 1] * 100) / 100} USD\n${pricechange} CHANGE OVER ${days} DAYS\n+ Information from coingecko at ${new Date()}\`\`\``)

            return([chart,subtext])
        }
    }
    catch (error){
        console.log(error)
        return(error)
    }
}