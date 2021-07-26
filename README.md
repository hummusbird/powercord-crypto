
# powercord-crypto
powercord-crypto is a powercord plugin version of my discord bot, ethernet.
It uses the coingecko API to get price data, and the [asciichart](https://github.com/kroitor/asciichart) module to create cool ascii price-history charts

powercord-crypto is **NOT** a selfbot. It never uploads embeds, and doesn't respond to other users. It uses powercord's built in command function, and uses code blocks to neatly arrange data.

# Installation
Open your powercord plugin folder, and run

`git clone https://github.com/hummusbird/powercord-crypto`

Make sure you run `npm install` inside the powercord-crypto folder afterwards to install dependencies.

# Usage
powercrd-crypto uses powercord's built in command function. The prefix will be the same as you've set in powercord's settings. I will use . for simplicity here.

powercord-crypto currently has six commands:

`.crypto help` - This message

`.rate [crypto] [fiat(s)]` - Prints current cryptocurrency pricing. Separate fiats using a comma.

`.convert [amount] [fiat] [crypto]` - Exchanges fiat currencies to crypto. 

`.chart [crypto] [days]` - Prints an ASCII price history chart.

`.list` - Lists available fiats and cryptos, that can be used in .rate and .convert.

`.donate` - Lists crypto donation addresses for powercord-crypto ;)


Some commands are explained further below.

## .rate

Prints a neat codeblock with exchanges between crypto and fiat currencies.

`.rate btc`
![CanaryImg](https://user-images.githubusercontent.com/38541651/121543474-d9ee0e80-ca00-11eb-8a62-2d4ae44fa01f.png)

Multiple fiat currencies can be defined, each separated by a comma. Only one cryptocurrency can be defined.

`.rate eth jpy,rub,czk`
![CanaryImg](https://user-images.githubusercontent.com/38541651/121543534-e4a8a380-ca00-11eb-9d70-f24d31e606bb.png)

## .convert 

Converts a specific value of fiat currency into crypto.

`.convert 100 usd btc`
![DiscordCanary_FJiqyiK4Zq](https://user-images.githubusercontent.com/38541651/121016515-21239780-c794-11eb-9f33-c640a34909ae.png)

You currently cannot convert crypto into fiat.
However, some cryptos, such as BTC AND ETH, are *also* marked as "fiat". This means you can convert ETH into USDT (A crypto tied to the US Dollar) as a workaround.

`.convert 0.05 eth usdt`
![DiscordCanary_fGYVdFM8hj](https://user-images.githubusercontent.com/38541651/121016922-a1e29380-c794-11eb-8d22-6673143e1fcd.png)

This workaround also allows you to convert ETH to BTC, and vice-versa. Check fiat.txt for all currencies marked as "fiat"

## .chart

Prints a price-history ascii codeblock chart. Define one crypto and how many days for width.

`.chart doge`
![DiscordCanary_VPsTu4klAS](https://user-images.githubusercontent.com/38541651/121017228-f423b480-c794-11eb-804e-3289a180d24f.png)

`.chart litecoin 100`
![image](https://user-images.githubusercontent.com/38541651/121017409-27feda00-c795-11eb-8ba1-09eaca050a6f.png)

## .crypto list

Run `.crypto list crypto` for a list of all supported cryptocurrencies.

Run `.crypto list fiat` for a list of all supported fiat currencies.

## Settings

powercord-crypto has an extensive settings panel, where you can define the default values for all commands.

You can also choose whether to print a taller, 32-line chart instead of the default 16 line one. This requires you to either have nitro (with the larger 4,000 character message limit) or to disable sending powercord-crypto messages publically.

![DiscordCanary_kXPBro2AsE](https://user-images.githubusercontent.com/38541651/126973395-b46f9022-3d77-46f8-93ec-0793f129589c.png)

## DISCLAMER

Do not use this plugin make financial decisions. Due to the way some of the functions work, the plugin is not as accurate as proper trading platforms. I am not resposible if you spend your life savings on poocoin, and elon says it's a bit smelly. (or any other decisions you make based off this plugin)
