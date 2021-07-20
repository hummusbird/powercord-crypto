const path = require('path')
const asciichart = require('asciichart')
const fs = require('fs')

function SymbolToID(short){
    try{
        short = short.toLowerCase();
        var data = fs.readFileSync(path.resolve(__dirname, '../data/crypto.json'), 'utf8')
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
module.exports.SymbolToID = SymbolToID;

function diffred(string){
    return('```diff\n- ' + string + '```')
}
module.exports.diffred = diffred;

function diffgreen(string) {
    return('```diff\n+ ' + string + '```')
}
module.exports.diffgreen = diffgreen;

function diff(string) {
    return ('```diff\n' + string + '```')
}
module.exports.diff = diff;

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
                return(`"${crypto}" is not a valid cryptocurrency!`)
            }
        }
    }
    catch (error){
        console.log(error)
        return(error)
    }
}
module.exports.contactAPI = contactAPI;
