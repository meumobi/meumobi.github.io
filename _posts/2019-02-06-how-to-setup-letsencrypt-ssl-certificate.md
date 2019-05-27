---
layout: post
title: "How to set SSL certificate with Let's Encrypt"
categories: [SSL]
tags: [letsencrypt]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

[Let's Encrypt](https://letsencrypt.org) recommends
>  that most people with shell access use the [Certbot](https://certbot.eff.org/) ACME client. It’s easy to use, works on many operating systems, and has great documentation.

We'll follow this way of this tutorial. The platform we use is Debian with Apache, but I suppose instructions can be applied for others platforms.

## Install CertBot Client
Certbot is meant to be run on the server where your website is hosted, then Log in the server and run following commands to install CertBot Client:

```
$ wget https://dl.eff.org/certbot-auto
$ chmod a+x certbot-auto
```

## Generate Certificates

./certbot-auto certonly --webroot -w /var/www/html/ -d vps.meumobi.com -d ww.vps.meumobi.com

mkdir -p .well-known/acme-challenge/
echo -n "Testing acme-challenge" >  /var/www/html/.well-known/acme-challenge/test
sudo certbot renew --dry-run

## Redirect for renewal

```
RewriteEngine On
ReweiteRule ^\.well-known\/acme-challenge\/ - [L]
RewriteCond %{HTTP:X-Forwarded-Proto} !https
RewriteRule ^(.*)$ https://spucnottingham.org.uk/$1 [R=301,L]
```

[Source](https://community.letsencrypt.org/t/https-prevents-certificate-auto-renewal-why-and-what-to-do/67564/6)

```
mod_rewrite with exception
RewriteCond %{SERVER_PORT} 80 
RewriteCond %{REQUEST_URI} !/page1/test
RewriteCond %{REQUEST_URI} !/page2
RewriteRule ^(.*)$ https://mywebsite.com/$1 [R,L]
```

https://stackoverflow.com/a/4021757/4982169

[Setup auto-renew on meumobi](https://github.com/meumobi/sitebuilder/issues/608)


- [certbot commands](https://certbot.eff.org/docs/using.html#certbot-commands)
- [Tutorial onepagezen: Free SSL Certificate Setup](https://www.onepagezen.com/free-ssl-certificate-wordpress-google-cloud-click-to-deploy/)
- [Tutorial onepagezen: How to Setup Auto-Renew](https://www.onepagezen.com/letsencrypt-auto-renew-certbot-apache/)
