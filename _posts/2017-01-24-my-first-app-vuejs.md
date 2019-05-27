---
layout: post
title: My First App with VueJS
categories: [vuejs]
tags: []
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

Vue is a progressive JavaScript framework that focuses on building user interfaces. You can see [VueJS in action online] (https://jsfiddle.net/chrisvfritz/50wL7mdz/) or install it on local. The simplest way to run it locally is using an official template. 


[Vue.js 2 Quickstart Tutorial 2017](https://medium.com/codingthesmartway-com-blog/vue-js-2-quickstart-tutorial-2017-246195cfbdd2#.h5luk79lz)

## Install
[vuejs install](https://vuejs.org/v2/guide/installation.html)

Prerequisites: [Node.js](https://nodejs.org/en/) (>=4.x, 6.x preferred) and [Git](https://git-scm.com/).

```
$ npm install -g vue-cli
$ vue list

  Available official templates:

  ★  browserify - A full-featured Browserify + vueify setup with hot-reload, linting & unit testing.
  ★  browserify-simple - A simple Browserify + vueify setup for quick prototyping.
  ★  simple - The simplest possible Vue setup in a single HTML file
  ★  webpack - A full-featured Webpack + vue-loader setup with hot reload, linting, testing & css extraction.
  ★  webpack-simple - A simple Webpack + vue-loader setup for quick prototyping.

$ vue init simple <project-name>
```

## Official Templates

The purpose of official Vue project templates are to provide opinionated, battery-included development tooling setups so that users can get started with actual app code as fast as possible. 

All official project templates are repos in the [vuejs-templates organization](https://github.com/vuejs-templates).

## Standalone vs. Runtime

Vue 2.0 uses a virtualDOM. Because of this Vue has to convert all HTML templates into render functions - also this HTML that you used in your HTML file.

The compiler responsible for this is included in the "standalone" build, but not in the "runtime-only" build.

Vue-loader / vueify does this compile step during build, and usually you can setup your app to only rely on .vue files. In that case, you can use the runtime-only build and save a few kb.

https://github.com/vuejs-templates
[Vue.js 2.0 is out, first impressions](https://medium.com/@machadogj/vue-js-2-0-is-out-first-impressions-b62aead7e039#.govmnvely)
[VueJs: The Basics](https://coligo.io/vuejs-the-basics/)
[Making HTTP Requests with vue-resource](https://coligo.io/building-a-mobile-app-with-cordova-vuejs/)

## How to access nested data objects?

```
<a v-bind:href="settings.url">{{ settings.url}}</a>

...

data: {
	settings: {},
	...
}
```

## How can I bind the html <title> content in vuejs?
`document.title`
`document.body`

## Google map
https://jsfiddle.net/crabbly/o3ahd45z/

## this.$el.querySelector('a')
https://jsfiddle.net/9mu9h1cf/

## Escape html in view

## Retiring vue-resource
[Retiring vue-resource](https://medium.com/the-vue-point/retiring-vue-resource-871a82880af4#.5fwezhyqe)

[Axios: Promise based HTTP client for the browser](https://github.com/mzabriskie/axios)

## Stay Connected

- [vuejsfeed](https://vuejsfeed.com)
- [coligo](https://coligo.io)