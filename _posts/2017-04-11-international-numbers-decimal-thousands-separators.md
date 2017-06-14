---
layout: post
title: Handling international numbers with decimal and thousands separators
categories: [Standard]
tags: [php, numbers]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---
Great Britain and the United States are two of the few places in the world that use a period to indicate the decimal place. Different countries officially designate different symbols for the decimal mark. The choice of symbol for the decimal mark also affects the choice of symbol for the thousands separator used in digit grouping. While the U.K. and U.S. use a comma to separate groups of thousands, many other countries use a period instead, and some countries separate thousands groups with a thin space.
When we manage values from different countries using several formats we need to use a standard in order to compute, compare or share results.

# Number localization

## Decimal mark
A [decimal mark](https://en.wikipedia.org/wiki/Decimal_mark) is a symbol used to separate the integer part from the fractional part of a number written in decimal form.

## Digit grouping
This refers to the number of digits contained between each separator for all digit groups that appear to the left of the decimal separator. For example, the 3-digit group is used for most cultures, such as for English (United States): 123,456,789.00. However, notice that Hindi uses a 2-digit grouping, except for the 3-digit grouping for denoting hundreds: 12,34,56,789.00

|Locale|Country|Format|Decimal mark|Digit grouping separator|
|----|----|----|----|----|
|en-us|USA|4,294,295.00|.|,|
|fr-fr|France|4 294 295,00|,|space|
|pt-br|Brazil|4.294.295,00|,|.|
|en-in|India|42,94,295.00|.|,|

# Standardize with javascript: toLocaleString()
The [toLocaleString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString) method returns a string with a language sensitive representation of this number.

```
var number = 1000.90;

// German uses comma as decimal separator and period for thousands
console.log(number.toLocaleString('de-DE')); // → 1.000,789
```

# Standardize with php: number_format()
[number_format](http://php.net/manual/en/function.number-format.php) format a number with grouped thousands and separator for the decimal point. It's not explicitly documented; [number_format also rounds](http://php.net/manual/en/function.number-format.php#88424).

```php

$num = "1,000.90";

echo number_format(str_replace(",","",$num), 2, '.', ''); // → 1000.90
```