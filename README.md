# pc-crypto
pc-crypto is a powercord plugin version of my discord bot, ethernet.It uses the coingecko API to get price data, and the [asciichart](https://github.com/kroitor/asciichart) module to create cool ascii price-history charts

pc-crypto is **NOT** a selfbot. It never uploads embeds, and doesn't respond to other users. It uses powercord's built in command function, and uses code blocks to neatly arrange data.

# Installation
Open your powercord plugin folder, and run

`git clone https://github.com/hummusbird/pc-crypto`

Make sure you run `npm install` to install dependencies.

# Usage
pc-crypto uses powercord's built in command function. The prefix will be the same as you've set in powercord's settings. I will use . for simplicity here.

pc-crypto currently has six commands:

`.crypto help` - This message
`.crypto rate [crypto] [fiat(s)]` - Prints current cryptocurrency pricing. Separate fiats using a comma.
`.crypto convert [amount] [fiat] [crypto]` - Exchanges fiat currencies to crypto. 
`.crypto chart [crypto] [days]` - Prints an ASCII price history chart. Defaults to 14 days.
`.crypto list` - Lists available fiats and cryptos, that can be used in %rate and %convert.
`.crypto donate` - Lists crypto donation addresses for pc-crypto ;)

Some commands are explained further below.

## .crypto rate

Prints a neat codeblock with exchanges between crypto and fiat currencies.

//ADD IMAGE

Multiple fiat currencies can be defined, each separated by a comma. Only one cryptocurrency can be defined.

//ADD IMAGE

## .crypto convert 

Converts a specific value of fiat currency into crypto.

//ADD IMAGE

You currently cannot convert crypto into fiat.
However, some cryptos, such as BTC AND ETH, are *also* marked as "fiat". This means you can convert ETH into USDT (A crypto tied to the US Dollar) as a workaround.

//ADD IMAGE

This workaround also allows you to convert ETH to BTC, and vice-versa. Check fiat.txt for all currencies marked as "fiat"

## .crypto chart

Prints a price-history ascii codeblock chart. Define one crypto and how many days for width.

//ADD IMAGE

## .crypto list

Run `.crypto list crypto` for a list of all supported cryptocurrencies.
Run `.crypto list fiat` for a list of all supported fiat currencies.

## DISCLAMER

Do not use this plugin make financial decisions. Due to the way some of the functions work, the plugin is not as accurate as proper trading platforms. I am not resposible if you spend your life savings on poocoin, and elon says it's a bit smelly. (or any other decisions you make based off this plugin)