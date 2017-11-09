---
layout: post
title: Yahoo finance API discontinued and now ?...
categories: [Stocks APIs, stock]
tags: []
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

A long time ago I've wrote a complete post to [Get Realtime Stock Quotes using Yahoo Finance API]({% post_url 2016-03-13-get-realtime-stock-quotes-yahoo-finance-api %}). Through comments and analytics, I've discovered how popular was this Service, for good or bad purposes. But this month this important group of users wake up with a bad news:
![Yahoo finance API discontinued]({{ site.BASE_PATH }}/assets/media/yahoo-finance/discontinued.png)
Source: [Yahoo Forum](https://forums.yahoo.net/t5/Yahoo-Finance-help/http-download-finance-yahoo-com-d-quotes-csv-s-GOOG-amp-f/m-p/387662/highlight/true#M6207)

In plain text:

> It has come to our attention that this service is being used in violation of the Yahoo Terms of Service.  As such, the service is being discontinued.  For all future markets and equities data research, please refer to finance.yahoo.com.  Thank you.

You can read this statement as well as many user’s comments on this abrupt service disruption on the [Yahoo forum](https://yahoo.uservoice.com/forums/382977-finance/suggestions/32103877-http-download-finance-yahoo-com-d-quotes-csv-s-a).

And you say "What????  Say it ain't so! "!

So, I've compiled below some smart and main alternatives raised on forums and blogs as workaround.

# Use GOOGLEFINANCE function on a Google spreadsheet

## Fetch financial data
Found this way on [a topic on Open Office forum](https://forum.openoffice.org/en/forum/viewtopic.php?f=9&p=430830#p431276). It's the smartest way I've found, requires less implementation efforts and allow easy customization. 

The idea is to use the [GOOGLEFINANCE function](https://support.google.com/docs/answer/3093281?hl=en) on a Google Spreadsheet to fetch current or historical securities information from Google Finance. With this function you can fetch any information you want about a ticker form Google Finance, as last trade, day's high, volume, etc. 

So you can **set up a spreadsheet with all datas** required and **publish it on web on csv**, et voila! You have now an endpoint to fetch financial datas.

I've done below a mapping table of yahoo csv tag names and GOOGLEFINANCE attributes. You can also check out an [example of spreadsheet](https://docs.google.com/spreadsheets/d/1uT2xjDtRHYfDYPM9BW2-kSkXnfC3HHDH6_rwLt3F-9Q/edit?usp=sharing). 

|Property|Yahoo csv tag name|GOOGLEFINANCE|
|---|---|---|---|
|Symbol|s|-|
|Last Trade (Price Only)|l1|price|
|Stock Exchange|x|-|
|Change in Percent|p2|changepct|
|Change|c1|change|
|Day's High|h|high|
|Day's Low|g|low|
|Day’s Range|m|-|
|Volume|v|volume|
|Currency|c4|currency|
|Last Trade Date|d1|-|
|Last Trade Time|t1|tradetime|

## Format cells
To format values as Yahoo Finance API you should need to edit formulas and/or customize cell format, ie [Showing plus sign](https://productforums.google.com/forum/#!topic/docs/HqUIPw2xeXc)
. Below some adjusts I've done :

|Property|Formula Updates|Custom format|
|---|---|---|
|Change in percent|=GOOGLEFINANCE($A2;"changepct")/100|+0.00%;-0.00%|
|Change||+0.00;-0.00|
|Day's High|=IF(ISNA(GOOGLEFINANCE($A2;"high"));"";GOOGLEFINANCE($A2;"high"))||
|Day's Low|=IF(ISNA(GOOGLEFINANCE($A2;"low"));"";GOOGLEFINANCE($A2;"low"))||
|Day's Range|=CONCATENATE(F2; " - "; G2)||
|Last Trade Date|=GOOGLEFINANCE($A2;"tradetime")|Day/Month/Year|
|Last Trade Time|=GOOGLEFINANCE($A2;"tradetime")|Hour:Minute|

## Publish on web

You can publish your spreadsheet to the web in a way that will allow you to import the data into Excel using an Excel Web Query. Follow the steps below:
	
1.	In Google Sheets, go to File > Publish to the Web
2.	Click on the dropdown box and select the StockQuotes worksheet
3.	Click on the Publish button and then copy the URL

# Get json from Google finance
If you prefer you can call directly Google Finance and retrieve a "almost" json (some lines should be removed), find below and example of request:

[https://finance.google.com/finance?q=BVMF:TPIS3&output=json](https://finance.google.com/finance?q=BVMF:TPIS3&output=json)

You can find the right query searching on https://finance.google.com/finance

I've done below a mapping table of yahoo csv tag names and Google json properties.

|Property|Yahoo csv tag name|Google json properties|
|---|---|---|---|
|Symbol|s|symbol|
|Last Trade (Price Only)|l1|l|
|Stock Exchange|x|exchange|
|Change in Percent|p2|cp|
|Change|c1|c|
|Day's High|h|hi|
|Day's Low|g|lo|
|Volume|v|vo|
|Currency|c4|-|
|Last Trade Date|d1|-|
|Last Trade Time|t1|-|

# Historical by Google
Google also provides a csv interface to fetch historical datas, below an example of request:

[https://finance.google.com/finance/historical?q=NYSE:WMT+&+startdate=Nov+3+2015+&+enddate=Nov+2+2017+&+output=csv](https://finance.google.com/finance/historical?q=NYSE:WMT+&+startdate=Nov+3+2015+&+enddate=Nov+2+2017+&+output=csv)


# Main Financial Stock APIs

## EOD EOD Historical Data
[EOD Historical Data](eodhistoricaldata.com) is a Stock Market Financial and historical data feed APIs.
Provides daily historical stock prices (EOD), technical and fundamental data (US only) for almost any stock in the world.

Fair pricing
EOD Historical Data — ALL WORLD
$14.99/month
40+ stock exchanges
100+ Indexes
25000+ Mutual Funds
*Live Stock Prices

## IEX
[IEX](https://iextrading.com/) provides Free, real time stock quotes and charts, but US only.
There [API](https://iextrading.com/developer/docs/#getting-started) is open, well documented and no restrictions.

## Alpha Vantage
[Alpha Vantage](https://www.alphavantage.co)

- Free APIs in JSON and CSV formats 
- Realtime and historical equity data 

It works for stock quotes (US-only though) and currency rates
