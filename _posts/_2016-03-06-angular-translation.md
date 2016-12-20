https://angular-translate.github.io/
https://medium.com/appseed-io/internationalize-and-localize-your-ionic-application-e16b4db1907b#.1au2iualt

Good example to understand how it works:
http://jsfiddle.net/PascalPrecht/eUGWJ/7/


I struggled with the same issues, read all the answers here and introduced i18n/l10n in my project. This are my outcomes:

angular-translate (http://angular-translate.github.io) is a perfect way to localize your content (custom-strings). But it does NOT translate angular's date, currency or number-filters.
Angular has a built-in mechanism to localize date, currency or number-filters. Translations for supported locales can be found here https://github.com/angular/angular.js/tree/master/src/ngLocale, the angular-guide is located at https://docs.angularjs.org/guide/i18n
The problem with angular's built-in mechanism: it's not that easy to change the locale at run time! This is where https://github.com/lgalfaso/angular-dynamic-locale comes into play. It allows you to change the language at run time pretty easily.
So the solution is to use both projects, angular-translate and angular-dynamic-locale.
Source: http://stackoverflow.com/a/33235942/4982169

http://pt.slideshare.net/kevinhakanson/internationalize-your-javascript-application-prepare-for-the-next-billion-internet-users