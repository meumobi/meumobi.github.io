How to upgrade the built-in PHP of your Mac (OsX)

Each Mac has a built-in Apache server that runs a built-in PHP. It's not recommended to upgrade the version of PHP built-in. Other tools and services built into OS X Server use that version of PHP to do parts of their jobs.

If you want your server to run a later version of PHP, you should download and install yourself a separate copy, installed in a different place to where the built-in is.

There are two installations of PHP one is used by apache and the other by the CLI or terminal. To update the one apache uses simply download a bitnami.com or other MAMP installation.  Updating the CLI is much more involved as stated above and has some associated risks.

Exploring the LAMP server of a Mac

To understand the built-in PHP of your Mac the first thing you should do is open your terminal and type in:

```bash
$ php --version
PHP 5.5.34 (cli) (built: Apr 22 2016 19:16:58) 
Copyright (c) 1997-2015 The PHP Group
Zend Engine v2.5.0, Copyright (c) 1998-2015 Zend Technologies
$ which php
/usr/bin/php
$ php -i | grep "php.ini"
Configuration File (php.ini) Path => /etc
Loaded Configuration File => /etc/php.ini
```

# How to update PHP on Mac OsX
All you need to do to install the whole thing is opening up a Shell and execute the following line, we use as example the latest version PHP 7.1:

```sh
$ curl -s https://getcomposer.org/doc/03-cli.md
```

Composer is a tool for dependency management in PHP. It allows you to declare the libraries your project depends on and it will manage (install/update) them for you.

$ brew search php |grep curl
https://github.com/Homebrew/homebrew-php

$ composer search curl

On the [Liip’s PHP Mac OsX home page](https://php-osx.liip.ch/) you will find a lot of useful information about your new PHP and available versions.

http://justinhileman.info/article/reinstalling-php-on-mac-os-x/
http://stackoverflow.com/questions/35131590/php-curl-set-ssl-version
http://pavelpolyakov.com/2014/11/17/updating-php-curl-on-ubuntu/
http://askubuntu.com/questions/9293/how-do-i-install-curl-in-php5
https://jason.pureconcepts.net/2016/09/upgrade-php-mac-os-x/
https://coolestguidesontheplanet.com/upgrade-php-on-osx/

Source: http://aerendir.me/2015/08/01/how-to-upgrade-php-built-in-your-mac-osx/

[OpenSSL in php and curl not update after upgrading OpenSSL in linux](http://stackoverflow.com/questions/40522227/openssl-in-php-and-curl-not-update-after-upgrading-openssl-in-linux)

https://curl.haxx.se/docs/sslcerts.html
http://www.onlinesmartketer.com/2009/06/23/curl-adding-installing-trusting-new-self-signed-certificate/
