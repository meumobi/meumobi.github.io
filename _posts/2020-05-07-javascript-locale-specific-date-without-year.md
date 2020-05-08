---
layout: post
title: Display date, only day and month (without year), in user's locale format
categories: []
tags: [date, momentjs, javascript]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

If you've ever tried to display anniversaries on JS projects maybe you faced this problem: "How to display date, only day and month (without year), in user's locale format?". In other words, given a date I want to display 'June 12' for english users and '12 de Junho' for portugueses.
If you look for [momentjs] or [dateformat], these popular frameworks do not provide this format, so the truth is out there...
![javascript-birthday-format]({{ site.BASE_PATH }}/assets/media/birthday/javascript-birthday-format_blurred.png)

## moment js feedback

This question was submitted to momentjs project and a [contributor has responded why momentjs shouldn't not provide such format](https://github.com/moment/moment/issues/3341#issuecomment-237751854)

> We don't currently offer a localized format token that is month and day only. This would require a significant expansion of the data, as there are likely more than one way to display this in various locales.

It's probably easier to use a custom format instead of trying to fit this into the locale-formats.

## Consider using Date.toLocaleDateString in some cases...

For web browsers [Date.toLocaleDateString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString) or [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) are certainly the best choice. Both take a JS Date object and provide options to output a locale date in the format you specify.

```js
var date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

// request a weekday along with a long date
var options = { month: 'long', day: 'numeric' };
console.log(date.toLocaleDateString('pt', options));
// → "20 de dezembro"
console.log(new Intl.DateTimeFormat('de-DE', options).format(date));
// → "20. Dezember"
```

BUT... these objects (or options) are not widely supported, check Browser Compatibility section of official doc (see above).
At the moment, **on node.js or Android webview, locales and options arguments are ignored**, the locale used and the form of the string returned are entirely implementation dependent.

## Fallback for node.js and Android webview

### Get locale format

When you can't use `Date.toLocaleDateString` and `Intl.DateTimeFormat` you should consider using custom format for locales you need to handle and default format as fallback for others. I show below how I acheive it, using `en` locale as fallback:

```js
const formats = {
  en: 'MMM D',
  pt: 'D [de] MMMM',
  'pt-br': 'D [de] MMMM'
};

const customFormat = (locale) => formats.hasOwnProperty(locale) ? formats[locale] : formats.en;

const locale = 'pt-br';
console.log('custom format: ', customFormat(locale));
// → "D [de] MMMM"
```

OBS: If you have no idea about which locale format to use you can have a look on momentjs localeData as inspiration:

```js
console.log(moment.localeData('pt-br').longDateFormat('LL'));
// → D [de] MMMM [de] YYYY
```

### Display formatted date

When you get the required format you can use you prefered library to format date, for instance with momentjs:

```js
var date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

moment(date).format('MMMM D')
// → "dezembro 20"
```

As alternative to momentjs you can use [dateformat](https://www.npmjs.com/package/dateformat).

I didn't find a clean way to do it in Vanilla JS, if you have some recommendations please drop a line on comment.

[dateformat]:<dateformat>
[momentjs]:<https://momentjs.com/>