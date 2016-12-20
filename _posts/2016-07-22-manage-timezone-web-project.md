---
layout: post
title: How to manage timezones on Web Project 
categories: []
tags: []
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

I've recently reviewed the UX of mobile App Project. The App run on Cordova/AngularJS but this issue can concerns any Architecture.  
The review concerned the list of events. Users browse a list of events of the company and are invited to save them on own device calendar. The issue I've faced was **which hour should I display and save on calendar** ? my App is multi-language and users are internationals, so consequently could access the App from any timezone (tz).
![plist]({{ site.BASE_PATH }}/assets/media/screenshots/tz_map.png)

Note: It's important to notice that we don't lead with recurring dates, and I will not to consider this case on this post. For more details I recommend to read [common mistakes when leading with reccuring dates](http://stackoverflow.com/a/19170823/4982169).

# The input date
Our backend receives dates through an xml feed. Dates use following format `YYYY-MM-DD hh:mm:ss`:

```xml
<start_date>2016-11-23 09:00:00</start_date>
```

We know that the feed provider use the tz of "America/Sao_Paulo". So the event occurs at 9:00 AM on area covered by "America/Sao_Paulo" tz, as defined by [IANA](ftp://ftp.iana.org/tz/data/zone1970.tab).
My first mistake was to consider that on this tz the time is GMT-3.

# Daylight Saving Time (DST)
The time in most of Brazil visited by foreign tourists is [Brasília Standar Time](http://wwp.greenwichmeantime.com/time-zone/south-america/brazil/time-brazil/brt/) (BRT) which is 3 hours behind Greenwich Mean Time (GMT-3).  This is true for Rio de Janeiro , São Paulo , Brasilia , Bahia, Minas Gerais etc.

Time in Brazil is determined at state level.  Some states on BRT adopt Summer Time (BRST), others do not. So depending in which state and which season you are the time offset with GMT is 3 (Standard Time: BRT = GMT-3) or 2h (Daylight Saving Time: BRST = GMT-2).

So, **the appointment at 9:00 in Brazil, could be at 9:00 AM in Sao Paulo but 8:00 AM in Belem (from Para state in Brazil). how to manage it ?**

# Universal Time Coordinated (UTC)
By convention, the world's major communities use time based on the 0° longitude meridian, also known as the Greenwich meridian.

Prior to 1972, this time was called Greenwich Mean Time (GMT) but is now referred to as Coordinated Universal Time or Universal Time Coordinated (UTC). It is a coordinated time scale, maintained by the Bureau International des Poids et Mesures (BIPM). It is also known as "Z time" or "Zulu Time".

To obtain your local time in the United States, you need to subtract a certain number of hours from UTC depending on how many time zones you are away from Greenwich (England).

**The switch to daylight saving time does not affect UTC**. It refers to time on the zero or Greenwich meridian, which is not adjusted to reflect changes either to or from Daylight Saving Time.

However, you need to know what happens during daylight saving time in timezones your App manage.

Source: [http://www.nhc.noaa.gov/aboututc.shtml](http://www.nhc.noaa.gov/aboututc.shtml)

# Unix Timestamp
The [unix time stamp](http://www.unixtimestamp.com/) is a way to track time as a running total of seconds. **This count starts at the Unix Epoch on January 1st, 1970 at UTC. Therefore, the unix time stamp is merely the number of seconds between a particular date and the Unix Epoch**.  
This point in time technically does not change no matter where you are located on the globe. This is very useful to computer systems for tracking and sorting dated information in dynamic and distributed applications both online and client side.

# What should I save on db ?
We've decided to save on our db the date on unix time stamp. Then `2016-11-23 09:00:00` on `America/Sao_Paulo` was converted to `1479898800`, that means the event occurs 1479898800 sec. after the Unix Epoch on January 1st, 1970 at UTC or using [timestamp converter](http://www.unixtimestamp.com/index.php) at `11/23/2016 @ 11:00am (UTC)`.

By this way we have an universal time easy to convert wherever users are.

# Timezone of user's device
The time we (as person) use is configured on our Device Settings. We can choose to [Set date and time automatically or manually set time and timezone](https://support.apple.com/en-us/HT203483). Then, it would make sense to take the device's timezone settings and use that as the current timezone.

# What should I display ?
## Benchmark MeetUp and Facebok
I've checked how Apps managed timezone issue. [Meetup](https://itunes.apple.com/us/app/meetup-groups-near-you-that/id375990038?mt=8) and [Facebook](https://itunes.apple.com/br/app/facebook/id284882215?mt=8) are 2 internationals Apps managing events. On both I've searched for two events, one on my location (America/Sao_Paulo) and a second one on a foreign country (Europe/Paris). My device timezone is setted to Europe/Paris (different of my location).

![plist]({{ site.BASE_PATH }}/assets/media/timezone/localize-datetime.png)

- Meetup displays time without extra details if event occurs on same timezone of device settings. **Meetup considers time ambiguous if device and event timezones are different, then it displays the [abbreviation of timezone](http://wwp.greenwichmeantime.com/to/abbreviations/)**.

- Facebook displays time without extra details if event occurs on same location of user. **Facebook considers time ambiguous if user and event locations are different, then it displays the UTC offset**.

I've changed my device's timezone, from Paris to Sao Paulo, and re-launch Meetup App. I can observed that the time in Brazil is now displayed without extra informations. And time of event in Paris is considered ambiguous and is displayed with UTC offset.

![plist]({{ site.BASE_PATH }}/assets/media/timezone/localize-datetime2.png)

## Benchmark iCalendar
If you use iOS you can check also benchmark iCalendar. The difference with previous benchmark is the fact that events are saved on device. If you save an event and change your device tz what should it displays ?

![plist]({{ site.BASE_PATH }}/assets/media/timezone/localize-datetime-calendar.png)

The event I saved has no location defined and I refused the App to get my location. iCalendar consider "ambiguous" the date when it's displayed on a different tz it was saved, and display both times saved and converted on new tz.

## Conclusion
So, **for a better UX, if an ambiguity exists, I recommend to display the timezone of the time provided**. Of course it's valid if your audience is international and/or your users are in an area covered by several tz. 
The definition of ambiguity is up to you, we've seen two ways, geo-location or device timezone. I think both are valid. I prefer the way adopted by Meetup (check device timezone), because if I save event on my calendar I expect to see it saved with same values I've seen on App. The Abbreviation of timezone on right of time alert us about the possible conversion.

**If the event has no location, a conference call for example, you can no matter about ambiguity**.

# How to manipulate time in pure JS?
If you try to manipulate time in pur JS, using [Standard built-in Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) you'll find issues with browser compatibility. Following link above you'll a browser compatibility status it needed.  
It's why we recommend using a lib for that, the most famous is [moment.js](http://momentjs.com/). We'll use it with its "add-on" [moment-timezone.js](http://momentjs.com/timezone/).

## Get UTC time
We've saved on db the unix timestamp of the event, that represents the number of seconds since 1 January, 1970 UTC.

```javascript
var date = new Date();
var UnixTimeStamp = 1479898800;
var time = new Date(timestamp*1000); // convert in ms.
```

## Get Locale
In order to localize time we need to detect what locale user prefers. A locale is an identifier that specifies how written language should be handled. The naming convention for locales is language[-region]

Following snippet and [read](http://www.mattzabriskie.com/blog/detecting-locale) do the trick:

```javascript
// IE
if (navigator.browserLanguage) {
    console.log(navigator.browserLanguage);
    // en-US
}
// All other vendors
else if (navigator.language) {
    console.log(navigator.language);
    // en-US
}
```

## Localize the time

By default, moment objects are created in the [local time zone](http://momentjs.com/timezone/docs/#/using-timezones/default-timezone/).

Use [date.toLocaleTimeString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString) with following options:

- locale = "pt-BR";
- options = "{hour:'numeric', minute:'numeric', timeZoneName:'short'}";

```javascript
console.log(date.toLocaleTimeString("pt-BR", {hour:'numeric', minute:'numeric', timeZoneName:'short'}))
> 09:00 BRST
```

## Guessing user zone

### moment.tz().guess()
moment.js provides `moment.tz.guess()` to get user tz. Then, if exists, you can compare the event and device's user tz and display the abbr if an ambiguity exists.

```javascript
console.log(moment.tz(moment.tz.guess()).format('z'));
> BRT
```

But be aware that [it's just a guess. It might guess wrong](https://github.com/moment/moment/issues/162#issuecomment-182539707).

### cordova-plugin-globalization
If you use Cordova you can use [cordova-plugin-globalization](https://github.com/apache/cordova-plugin-globalization#navigatorglobalizationgetdatepattern), this plugin obtains information and performs operations specific to the user's locale, language, and timezone.

```javascript
function checkDatePattern() {
    navigator.globalization.getDatePattern(
        function (date) { 
          alert('Timezone Abbr: ' + date.timezone + '\n'); },
          // Displays "GMT-03:00"
        function () { alert('Error getting timezone\n'); },
        { formatLength: 'short', selector: 'date and time' }
    );
}
```

## Resume

| Purpose | Method | Result|
|---
| Load UTC Time|date.setTime(1000*UnixTimeStamp) |1479898800000|
| Get ISOString|date.toISOString()|2016-11-23T11:00:00.000Z|
| Get Locale Time|toLocaleTimeString(locale, options)|09:00 BRST|
| Guess timezone|moment.tz.guess()|Europe/Paris|


