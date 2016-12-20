---
layout: post
title: Move your blog to Jekyll and github-pages
categories: [jekyll]
tags: [github]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

http://joshualande.com/jekyll-github-pages-poole/
http://www.chrisgmyr.com/2015/02/finally-moved-my-blog-to-jekyll/

# Install jekyll and libraries

```bash
$ gem install jekyll jekyll-paginate kramdown
```

## you don't have write permissions...

```bash
$ gem install jekyll
Fetching: liquid-3.0.6.gem (100%)
ERROR:  While executing gem ... (Gem::FilePermissionError)
    You don't have write permissions for the /Library/Ruby/Gems/2.0.0 directory.
```

> That is the version of Ruby installed by Apple, for their own use. While it's OK to make minor modifications, it's not a good idea to continue along that track.  
  
> I'll strongly suggest you look into using either [rbenv](https://github.com/rbenv/rbenv) or [RVM](https://rvm.io/rvm/install) to manage a separate Ruby, installed into a sandbox in your home directory, that you can modify/fold/spindle/change without worrying about messing up the system Ruby.

> rbenv takes a more "hands-off" approach to managing your Ruby installation. RVM has a lot of features and is very powerful, but, as a result is more intrusive.

Source: http://stackoverflow.com/a/14607772/4982169

Using sudo is probably fine if you want these tools to be installed globally.

The problem is that these binaries are installed into /usr/bin, which is off-limits since El Capitan. However, you can install them into /usr/local/bin instead. That's where Homebrew install its stuff, so it probably exists already.

sudo gem install fakes3 -n/usr/local/bin
Gems will be installed into /usr/local/bin and every user on your system can use them if it's in their PATH.

Source:http://stackoverflow.com/a/32253142/4982169

# Add internal link in post
```
[previous post]({% post_url 2015-06-06-how-easily-create-mobile-app-phonegap %})
```

# Render Tables with kramdown

>  A line starting with a pipe character (|) starts a table row. However, if the pipe characters is immediately followed by a dash (-), a separator line is created

Source: [http://kramdown.gettalong.org/quickref.html#tables](http://kramdown.gettalong.org/quickref.html#tables)

# Line break
We should use the ["secret" MD's two-space line breaks](http://meta.stackexchange.com/questions/40976/what-is-the-reason-for-the-top-secret-two-space-newline-markdown-weirdness). Digit two empty space and a break-line (enter).


# Open links in a new window, target=_blank

## Plain HTML
Most Markdown engines I've seen allow plain HTML

```html
<a href="http://example.com/" target="_blank">Hello, world!</a>
```

Source: http://stackoverflow.com/questions/4425198/markdown-target-blank

## JS hook
Add following snippet on `/assets/js/app.js`, all links on posts will open on new window. It includes internal links.

```js
	// prevent line-breaks in links and make open in new tab
	$('div.article_body a').not('[rel="footnote"], [rev="footnote"]').html(function(i, str) {
	    return str.replace(/ /g,'&nbsp;');
	}).attr('target','_blank');
```

Source: http://mrloh.se/2015/05/bending-markdown-for-jekyll-and-github-pages/