
# CREATING A YAHOO FINANCE CHART WITH D3 AND D3FC
Use the open source [D3FC](http://scottlogic.github.io/d3fc/), A collection of components that make it easy to build interactive charts with D3.
Fiancial example: https://d3fc.io/components/series/candlestick.html

# Legality of use of Yahoo! data on commercial website?
Clause 1.7.4. of the [Yahoo APIs Terms of Use](https://policies.yahoo.com/us/en/yahoo/terms/product-atos/apiforydn/index.htm) applies:
> 1. Licensed Uses and Restrictions
    [...]
    7. YOU SHALL NOT:
    [...]
        4. Sell, lease, share, transfer, or sublicense the Yahoo APIs or access or access codes thereto or **derive income from the use or provision of the Yahoo APIs, whether for direct commercial or monetary gain or otherwise**, unless the API Documents specifically permit otherwise or Yahoo gives prior, express, written permission
				

# What is the query limit on Yahoo's Finance API?
[YQL Usage infor;ation and limits](https://developer.yahoo.com/yql/guide/usage_info_limits.html)

Rate Limits:
![Yahoo Finance Rate Limits]({{ site.BASE_PATH }}/assets/media/yahoo-finance/limits.png)

What this means:

- Using the Public API (without authentication), you are limited to 2,000 requests per hour per IP (or up to a total of 48,000 requests a day).
- Using the Private API (with OAuth authentication using an API key), you are limited to 20,000 requests per hour per IP and you are limited to 100,000 requests per day per API Key.

# Getting stock graphs from yahoo finance
http://stackoverflow.com/questions/9807353/getting-stock-graphs-from-yahoo-finance
http://chart.finance.yahoo.com/t?s=CIEL3.SA&lang=pt-br&region=br&width=300&height=180
http://chart.finance.yahoo.com/z?s=ciel3.sa&t=6m&q=l&l=on&z=s&p=m50,m200

# Yahoo finance webservice API
http://finance.yahoo.com/webservice/v1/symbols/ERJ/quote?format=json&view=detail
http://stackoverflow.com/questions/27543776/yahoo-finance-webservice-api

http://wern-ancheta.com/blog/2015/04/05/getting-started-with-the-yahoo-finance-api/


http://yuilibrary.com/yui/docs/charts/
https://d3fc.io/components/series/candlestick.html


http://www.revistari.com.br/201/1084
http://www.jarloo.com/yahoo_finance/
https://github.com/josephdpurcell/YahooFinanceAPI
http://www.gummy-stuff.org/Yahoo-data.htm
https://developer.yahoo.com/forum/General-Discussion-at-YDN/Stock-Quote-API-returning-commas-in/1234765072000-6036c128-a7e0-3aa5-9e72-1af1871e1b41/
https://developer.yahoo.com/find/?q=stock
http://www.blogbyben.com/2009/01/truly-simple-stock-api.html
http://thesimplesynthesis.com/article/finance-apis
http://bl.ocks.org/ColinEberhardt/c806028e47281b8dbb1d
http://blog.scottlogic.com/2015/07/08/yahoo-finance-chart.html
