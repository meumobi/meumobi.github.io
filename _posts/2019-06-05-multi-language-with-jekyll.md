---
layout: post
title: 'Deploy a multi-language jekyll site'
categories: [jekyll]
tags: [languages, translation]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

If you plan to launch a multi-language website running on Jekyll, you certainly need to pay 

- language switcher
  - static switcher based on user click
  - auto switch to best suitable language on page load based on browser language
- permalinks
  - allow to share page on target language /en/about, /pt/sobre
- handle language codes and geographic regions
  - ie. distinguish pt-pt and pt-br
  - if browser language is pt-br and I provide pt version but not pt-br, then use it
- SEO

## New Jekyll Project

If you need details about basic concepts of Jekyll, I recommend to read my previous post [Getting started with Jekyll]({% post_url 2015-08-11-getting-started-jekyll-github-pages %}).

```bash
$ jekyll new demo-multi-lang
Running bundle install in /Users/vdias/Dvpt/PROJECTS/demo-multi-lang... 


Your user account isn't allowed to install to the system RubyGems.
  You can cancel this installation and run:

      bundle install --path vendor/bundle

  to install the gems into ./vendor/bundle/, or you can enter your password
  and install the bundled gems to RubyGems using sudo.

  Password: 
  
$ cd demo-multi-lang
$ bundle install --path vendor/bundle
```

And run to test with `$ bundle exec jekyll serve`

The theme `minima`is configured on `_config.yml`, you can change it 

By default you should reach a landing page with:
- a site descriptio on footer you can edit on `_config.yml`
- a link to RSS feed (feed.xml) of _posts exported by [jekyll-feed](https://github.com/jekyll/jekyll-feed) plugin.


## Plugin jekyll-multiple-languages-plugin
### Install
Following 3rd option from https://jekyllrb.com/docs/plugins/installation/
Declare gem on Gemfile and run `$ bundle install

## Permalinks for the same page in other languages

{% raw %}
```liquid
{% for lang in site.languages %}
  <p>{% tl about {{ lang }} %}</p>
{% endfor %}
```

Or to display links of current page

```liquid
{% for lang in site.languages %}
  <p>{% tl {{ page.namespace }} {{ lang }} %}</p>
{% endfor %}
```
{% endraw %}

[Source](https://github.com/Anthony-Gaudino/jekyll-multiple-languages-plugin/pull/53)

## Language switcher
### Detect browser language

[navigator.language Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorLanguage/language#Browser_compatibility)

```js
var [lang, locale] = (((navigator.userLanguage || navigator.language).replace('-', '_')).toLowerCase()).split('_');
```

### Static switcher
List supported language, but if 1st element use default site on root folder, else prefix path by name of lang.

{% raw %}
```liquid
{% for lang in site.languages %}
  {% if forloop.index0 == 0 %}
    <a href="{{ page.url }}" class="footer__link">{{ lang }}</a>
  {% else %}
    |<a href="/{{ lang }}{{ page.url }}" class="footer__link">{{ lang }}</a>
  {% endif %}
{% endfor %}
```
{% endraw %}

### Auto switcher
The auto-switcher is responsible for defining the best suitable lang supported for browser lang and when redirect user to it.

#### Best suitable lang supported
We can detect the best suitable lang supported as done below. We check first if we can satisfy the lang and locale (or region), if not we check for only lang. For instance, if we support `en` and browser lang is `en-US`, our function will return `en`. If none is supported the function return the default lang (1st of supported array).

```js
function getBestSuitableSupportedLang(lang, locale, supported) {
  // Exclude first element, default language
  var supported_lang = supported.shift();
  
  if (supported.includes(lang + "-" + locale)) {
    supported_lang = lang + "-" + locale;
  } else if (supported.includes(lang)) {
    supported_lang = lang;
  }

  return supported_lang;
}
```

NB: we use [includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) method on array, that is not supported by IE, but who cares about IE ?...

#### Redirect
Then, if current lang of site is different of best suitable returned by function `getBestSuitableSupportedLang` means we should redirect user. And should works as described below:

```js
var [lang, locale] = (((navigator.userLanguage || navigator.language).replace('-', '_')).toLowerCase()).split('_');
var supported_languages = {{ site.languages | jsonify }};
var current_lang = '{{ site.lang }}';

var suitable_lang = getBestSuitableSupportedLang(lang, locale, supported_languages)

if (current_lang !== suitable_lang) {
  window.location = '/' + suitable_lang + '/';
}
```

#### Check if landing page
But the auto-switcher to be compliant with static-switcher we should add a mechanism to detect if user choose the language, if yes then disable auto-switcher. To achieve it we check if user is landing on our site, if yes enable auto-switcher if not means user choose a different language and we disable auto-switcher. 

```js
var hostname = window.location.hostname;
var referrer = document.referrer;

var landingPage = !referrer || referrer.indexOf(hostname) == -1;

if (landingPage && (current_lang !== suitable_lang)) {
  window.location = '/' + suitable_lang + '/';
}
```

#### Redirect only home
And because all pages not necessarly are translated we'll enable auto-switcher ONLY on home. For instance, if user access directly the page /en/about we'll not redirect him to /pt/sobre (user could use static-switcher to achieve it). This is done by including the auto-switcher on page only for index.html, using a specific layout for it or a conditional include.

## Declare language attribute on html tag
Always use a language attribute on the html tag to declare the default language of the text in the page. 

```html
<!DOCTYPE html>
<html lang="{{ site.lang }}">
...
```

Examples: console.log(navigator.languages); // ["fr", "fr-FR", "en-US", "en"]

## What if element content and attribute values are in different languages?

```html
<span title="Spanish"><a lang="es" href="qa-html-language-declarations.es">Español</a></span>
```

[Source]()https://www.w3.org/International/questions/qa-html-language-declarations#contentvsattribute

## Choosing language value
To be sure that all user agents recognize which language you mean, you need to follow a standard approach when providing language attribute values. You also need to consider how to refer in a standard way to dialectal differences between languages, such as the difference between US English and British English

[Source](https://www.w3.org/International/questions/qa-html-language-declarations#langvalues)


## SEO
### Sitemap
Generate sitemaps with [jekyll-sitemap plugin](https://github.com/jekyll/jekyll-sitemap) and use sitemapindex to link sitemap of each language.

[Source](https://github.com/jekyll/jekyll-sitemap/issues/88#issuecomment-383849534)




## Localize date and time
{% raw %}
Use `_includes/date.html`

```
{% if page.lang == 'en' %}
    {{ page.date | date: "%d/%m/%Y" }}
{% endif %}

{% if page.lang == 'fr' %}
    {{ page.date | date: "%Y-%m-%d" }}
{% endif %}
```

And on template `{% include date.html %}`
{% endraw %}
[Source](https://www.sylvaindurand.fr/making-jekyll-multilingual/)

## Furthermore

- [Liquid Reference](https://shopify.github.io/liquid/)
- [Jekyll Liquid Cheatsheet](https://gist.github.com/JJediny/a466eed62cee30ad45e2)
