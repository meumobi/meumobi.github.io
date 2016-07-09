---
layout: post
title: How Gulp Preprocess is helpful to clean my code
categories: [development]
tags: [gulp]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---
Looking for a "gulp way" to display/hide a snippet on my html I've found gulp-preprocess. 
I use the same views for several projects but one of them, we'll call it PROJECT_A, requires a specific piece of html. In order to build the correct html file for PROJECT_A I need something that allows to process
I didn't want to use a js solution because it means all projects should load the specific non required html.

```html
<ul>
	<li></li>
	...
	if PROJECT_A then 
	<li><a href="...">...</a></li>
	endif
	<li></li>
</ul>
```

https://www.npmjs.com/package/gulp-preprocess

Directive syntax
https://github.com/jsoverson/preprocess