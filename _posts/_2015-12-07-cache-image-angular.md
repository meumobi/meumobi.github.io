
imgcache.js
Angular wrapper/Handler

	config.vendor.js.push('./bower_components/angular-imgcache/angular-imgcache.js');
	config.vendor.js.push('./bower_components/imgcache.js/js/imgcache.js');


.module('infoMobi', [
	...,
	'ImgCache'
])

<img img-cache ic-src="{{vm.logo}}" ng-if="vm.logo"/>

Content Security Policy
https://github.com/meumobi/IRmobi/commit/5b6c026f4fccadebe2203c2a564efea49b4fd72e