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


