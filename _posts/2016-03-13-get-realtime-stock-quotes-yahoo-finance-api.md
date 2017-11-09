---
layout: post
title: Get Realtime Stock Quotes using Yahoo Finance API
categories: [Stocks APIs]
tags: []
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---
Yahoo finance API seems to be the most popular since Google Finance API has been deprecated (have been discontinued in October 2012). If you want to try another provider, feel free to look at [96 Stocks APIs: Bloomberg, NASDAQ and E*TRADE](http://www.programmableweb.com/news/96-stocks-apis-bloomberg-nasdaq-and-etrade/2013/05/22) article.

**/!\ Update 2017-11-02**: [Yahoo finance API discontinued and now ?...]({% post_url 2017-11-07-yahoo-finance-download-API-discontinued %}), see our post to find an alternative.

# Legality of use of Yahoo! data on commercial website?

## Yahoo Community Manager response
I had difficulties to understand if it's allowed to use Yahoo Finance API for own project. A [response of a Yahoo Community Manager on 2009](https://developer.yahoo.com/forum/General-Discussion-at-YDN/Legality-of-use-Yahoo-Finance-data/1258550709000-58fd8cc5-fe37-3ec3-9094-a7ab79da0e7c/) is NO:

> 2 The **data that we provide is not available for distribution at all off of Yahoo!**  
..  
Robyn Tippins  
Community Manager, YDN

The same Robyn Tippins also mentioned on [previous comment](https://developer.yahoo.com/forum/General-Discussion-at-YDN/Using-Yahoo-Finance-API-Not-RSS-/1250246255000-0b82f8f0-7f48-3af2-8fe2-e73a138cbfaa/) why the webservice is online:

>  It appears some have reverse engineered an API that they use to pull Finance data, but they are breaking our Terms of Service (no redistribution of Finance data) in doing this so I would encourage you to avoid using these webservices.

![Yahoo-finance API terms]({{ site.BASE_PATH }}/assets/media/yahoo-finance/terms.png)

## Yahoo APIs Terms of Use
[Yahoo APIs Terms of Use](https://policies.yahoo.com/us/en/yahoo/terms/product-atos/apiforydn/index.htm) prevent to "derive income from the use of the Yahoo APIs", check Clause 1.7.4. below for details, but don't seems to prevent the use for free purpose.

> 1. Licensed Uses and Restrictions
    [...]
    7. YOU SHALL NOT:
    [...]
        4. Sell, lease, share, transfer, or sublicense the Yahoo APIs or access or access codes thereto or **derive income from the use or provision of the Yahoo APIs, whether for direct commercial or monetary gain or otherwise**, unless the API Documents specifically permit otherwise or Yahoo gives prior, express, written permission

## Redistribution agreement with the exchanges
An [interesting comment explains redistribution rights of Yahoo financial datas](https://developer.yahoo.com/forum/General-Discussion-at-YDN/Using-Yahoo-Finance-API-Not-RSS-/1250246255000-0b82f8f0-7f48-3af2-8fe2-e73a138cbfaa/):

> You cannot use their data for redistribution no matter what the case is (even if its a free website). I run three financial websites (including one free one) and can tell you that the issue is not with Yahoo! Finance, but with who they pull their data from, which is typically either straight from the exchanges or from a data aggregator (like Morningstar, Thomson Reuters, Interactive Data, etc.). You are required to sign redistribution agreements and pay redistribution fees with each exchange you display prices from even if you are pulling the data from a data aggregator and not directly from the exchange. Point being, you need to go directly to the exchanges or to a data aggregator that offers redistribution (still need to sign redistribution agreements). Note that **your are still considered to be redistribution data even if you are just displaying the prices on your website** and not actually allowing the users to download the data.  
Its pretty unfortunate - especially when you are providing an educational service as one of our sites does (to schools), but its how the exchanges make money and it wouldn't be fair to companies like ours that pay the redistribution fees for people to just be able to launch free financial apps.  
**Redistribution of delayed equities prices is actually free anyways, but you still have to sign a redistribution agreement with the exchanges.** You will also need to purchase access to a web service that offers the prices. You wont be able to find a decent quality web service without paying a fee, which is typically based on the number of hits (and sometimes data points) you consume.

# How to fetch Stock Quotes ?
Then, now you know the risks, let's chat about how to fetch stock quotes. I know 3 ways to fetch Stock quotes from Yahoo API:

- **Yahoo YQL Finance API**: use YQL (Yahoo Query Language) and yahoo.finance.quotes.xml data table from `https://query.yahooapis.com/v1/public/yql`, see [example](https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22YHOO%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=)
- **Yahoo CSV Finance API**: get csv results from `http://finance.yahoo.com/d/quotes.csv`, see [example](http://finance.yahoo.com/d/quotes.csv?s=ciel3.SA&f=aa2bb2b3b4cc1c3c4c6c8dd1d2ee1e7e8e9ghjkg1g3g4g5g6ii5j1j3j4j5j6k1k2k4k5ll1l2l3mm2m3m4m5m6m7m8nn4opp1p2p5p6qrr1r2r5r6r7ss1s7t1t7t8vv1v7ww1w4xy)
- **Yahoo webservice API**: get json from `finance.yahoo.com/webservice/v1/symbols` see [example](http://finance.yahoo.com/webservice/v1/symbols/CIEL3.SA/quote?format=json&view=detail)

# Yahoo YQL Finance API
Under the hood, the [YQL](https://developer.yahoo.com/yql/) Open Data Table is really just using the yahoo CSV API to actually get the stock prices.
You can check on Github and [yahoo.finance.quotes YQL data table](https://github.com/yql/yql-tables/blob/master/yahoo/finance/yahoo.finance.quotes.xml#L10).

The interesting point on using YQL is that you can personalize your response format (json or xml) and properties.
See [Getting stock information with YQL and open data tables](http://www.yqlblog.net/blog/2009/06/02/getting-stock-information-with-yql-and-open-data-tables/) article from YQL Blog for more details.

You can use the [YahooFinanceAPI.php](https://github.com/josephdpurcell/YahooFinanceAPI) implementation.

## What is the query limit on Yahoo's Finance API?
[YQL Usage information and limits](https://developer.yahoo.com/yql/guide/usage_info_limits.html)

What this means:

- Using the Public API (without authentication), you are limited to 2,000 requests per hour per IP (or up to a total of 48,000 requests a day).
- Using the Private API (with OAuth authentication using an API key), you are limited to 20,000 requests per hour per IP and you are limited to 100,000 requests per day per API Key.

## Issues Using YQL and Open Data Tables

### Unreachable datatables.org raises HTTP/1.0 400 Bad Request
We've faced serious issues with YQL data tables. The main issue was the availability of [datatables.org](http://datatables.org). When datatables.org is unreachable, YQL is unable to retrieve data.

If you use the [YQL console](https://developer.yahoo.com/yql/console/?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22YHOO%22)) you'll have the following response `No definition found for Table yahoo.finance.quotes`.

An older [post on YQL Forum](https://developer.yahoo.com/forum/YQL/No-definition-found-for-Table-yahoo-finance-quotes/1252596855000-919237d4-ef6d-397c-97d9-68a7f6336f02/) mention this issue in 2009.

When it occured, as temporary fix, we updated the url of YQL to fetch directly the table from [yql-tables GitHub repository](https://github.com/yql/yql-tables).
To achieve it we use following [YQL statement](https://developer.yahoo.com/yql/console/?q=https%3A%2F%2Fraw.githubusercontent.com%2Fyql%2Fyql-tables%2Fmaster%2Fyahoo%2Ffinance%2Fyahoo.finance.quotes.xml%22%20as%20quotes%3B%0Aselect%20*%20from%20quotes%20where%20symbol%20in%20(%22CIEL3.SA%22)&env=store://datatables.org/alltableswithkeys#h=use+%22https%3A%2F%2Fraw.githubusercontent.com%2Fyql%2Fyql-tables%2Fmaster%2Fyahoo%2Ffinance%2Fyahoo.finance.quotes.xml%22+as+quotes%3B%0Aselect+*+from+quotes+where+symbol+in+(%22CIEL3.SA%22)):

```bash
use "https://raw.githubusercontent.com/yql/yql-tables/master/yahoo/finance/yahoo.finance.quotes.xml" as quotes;
select * from quotes where symbol in ("CIEL3.SA")
```

### unstable Quotes delay
Another big issues we've found was the delay of quotes. I've personaly opened an [issue to YDN](https://developer.yahoo.com/forums/#/discussion/7926/unconsistent-results-from-yql-yql-table-yahoo-finance-quotes-seems-to-use-cache) about it:

> When I check LastTradeTime property, it returns unconsistent hours of trade, for example "12:46pm", next request returns "12:44pm" and next request "2:42pm". All of these 3 requests ran on a period of 2 min.

# Yahoo CSV Finance API
**/!\ Update 2017-11-02**: [Yahoo CSV Finance API has been shut down by Yahoo Finance](https://forums.yahoo.net/t5/Yahoo-Finance-help/http-download-finance-yahoo-com-d-quotes-csv-s-GOOG-amp-f/m-p/387662/highlight/true#M6207), see our post to find an alternative [Yahoo finance API discontinued and now ?...]({% post_url 2017-11-07-yahoo-finance-download-API-discontinued %})

To make a request to the CSV API, you can either do that from here:

`http://download.finance.yahoo.com/d/quotes.csv?s={SYMBOLS}&f={DATA THAT WE WANT}`

Or here:

`http://finance.yahoo.com/d/quotes.csv?s={SYMBOLS}&f={DATA THAT WE WANT}`

All data availables could be found at [http://www.jarloo.com/yahoo_finance/](http://www.jarloo.com/yahoo_finance/)

# Yahoo webservice API

**/!\ Update 2016-12-20**: Seems that [Yahoo has interrupted this webservice](http://stackoverflow.com/questions/38355075/has-yahoo-finance-web-service-disappeared-api-changed-down-temporarily) on middle of 2016

# Historical data

**/!\ Update 2017-05-17**: [Historical API has been shut down by Yahoo Finance](https://forums.yahoo.net/t5/Yahoo-Finance-help/Is-Yahoo-Finance-API-broken/m-p/251312/highlight/true#M3123)

> This feature was discontinued by the Finance team and they will not be reintroducing that functionality. 

# Creating a Yahoo Finance chart
Some nice posts provide tips and tricks to create Yahoo Finance charts. One of them is the ["Yahoo Finance Chart"](http://bl.ocks.org/ColinEberhardt/8feaa6deaf7a5e276c49) by [Colin Eberhardt](https://twitter.com/ColinEberhardt). 

![Yahoo-finance Chart]({{ site.BASE_PATH }}/assets/media/yahoo-finance/chart.png)

It uses the open source [D3FC](http://scottlogic.github.io/d3fc/), a collection of components that make it easy to build interactive charts with D3.
See an example of [Candlestick series using D3FC](https://d3fc.io/components/series/candlestick.html).

I didn't investigate yet but maybe the [yuilibrary](http://yuilibrary.com/yui/docs/charts/) can provide nice tools to achieve it also.

# Alternatives
There are plenty of [Online Services to get quotes](http://www.programmableweb.com/news/96-stocks-apis-bloomberg-nasdaq-and-etrade/2013/05/22), but I don't know any free and stable.


[openexchangerates](https://openexchangerates.org/) seems simple to integrate and has an affordable price.

Let me know on comment if you have other suggestions.
