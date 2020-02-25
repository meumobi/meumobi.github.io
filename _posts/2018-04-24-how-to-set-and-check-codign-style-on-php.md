---
layout: post
title: How to set and check a coding style on PHP
categories: [Tips and tricks]
tags: [tutorial,php]
author:
  name: Daniel Antonio Conte
  email: danconte72@gmail.com
  github: danconte72
  twitter: danielconte
  bio: Life, Universe, Everything
  email_md5: 8200df29874231d4d8c2c7beae170b31
---

One of Meumobi's goals is keep the code clean, readable and maintainable. We have did this manually so far. In order to improve our quality we have been studying how to do this automatically.
![PHP Logo]({{ site.BASE_PATH}}/assets/media/php.png)

## Define a coding sytle

There are some coding styles available, but one of most famous is *PHP Standard Recommendation* (PSR) published by the [PHP Framework Interop Group](https://www.php-fig.org/). Some members are from Zend and Laravel for example. The Recomendations 1 and 2 are about coding styles. [PSR-1](https://www.php-fig.org/psr/psr-1/) comprises what should be considered the standard coding elements that are required to ensure a high level of technical interoperability between shared PHP code. [PSR-2](https://www.php-fig.org/psr/psr-2/) considers PSR-1 and it is intended to reduce cognitive friction when scanning code from different authors. It does so by enumerating a shared set of rules and expectations about how to format PHP code.
So we chose PSR-2.

## Apply sytle in real time

There are some tools to help your work:
- [PHP_CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer) - it check and fix, with a Visual Studio Code [Plugin](https://marketplace.visualstudio.com/items?itemName=ikappas.phpcs); 
- [PHP-CS-Fixe](https://github.com/friendsofphp/php-cs-fixer) - a toop to automatically fix PHP your repository before commits, with a Visual Studio Code [Plugin](https://marketplace.visualstudio.com/items?itemName=Sophisticode.php-formatter) too;

## Check style after commits

If you have a public repository you can check your code free by [StyleCI](tyleci.io). It analyzes any commit and indicates how to fix.

### Using StyleCI

- Signup with github, and allow access to a repo that you want to fix code style;
- Config:
  - Open https://styleci.io/repos/[repo_id]/settings and on configuration, add your config, *preset: psr2* for this case;
  - You can create your own rules just have fun with the [docs](https://styleci.readme.io/docs/configuration);
- Use:
  - On https://styleci.io/repos/[repo_id] click in *analyze now*;
  - Then in *show details*, there are some options, like create a PR to fix the coding style;
  - Choose one, an enjoy;

## Furthermore
- [How to automatically apply the Laravel PHP code style](https://barryvanveen.nl/blog/31-how-to-automatically-apply-the-laravel-php-code-style);