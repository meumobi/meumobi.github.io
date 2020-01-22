---
layout: post
title: Github Pages with Jekyll and Markdown
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

If you are a developer and are looking for a plug and play solution to start your own blog [jekyll](https://jekyllrb.com/) is a good alternative, and coupled with github you'll be able to deploy and host it with no pain.
![jekyll-github-pages]({{ site.BASE_PATH }}/assets/media/jekyll/jekyll-github-pages.jpg)

 ```
/!\ This post was updated on Jul 30, 2019 and tested with these packages:

jekyll 3.8.6
ruby 2.6.3

Find an issue? please drop a line on comment, I'll fix it ASAP
```

## Getting started

### Install jekyll and libraries

```bash
$ gem install jekyll bundler
```

if you face a permission error like below, means you need to install a new version of ruby

#### You don't have write permissions...

```bash
$ gem install jekyll
Fetching: liquid-3.0.6.gem (100%)
ERROR:  While executing gem ... (Gem::FilePermissionError)
    You don't have write permissions for the /Library/Ruby/Gems/2.0.0 directory.
```

> That is the version of Ruby installed by Apple, for their own use. While it's OK to make minor modifications, it's not a good idea to continue along that track.  
  
> I'll strongly suggest you look into using either [rbenv](https://github.com/rbenv/rbenv) or [RVM](https://rvm.io/rvm/install) to manage a separate Ruby, installed into a sandbox in your home directory, that you can modify/fold/spindle/change without worrying about messing up the system Ruby.

> rbenv takes a more "hands-off" approach to managing your Ruby installation. RVM has a lot of features and is very powerful, but, as a result is more intrusive.

Source: [http://stackoverflow.com/a/14607772/4982169](http://stackoverflow.com/a/14607772/4982169)

```
$ brew install rbenv
Verify that rbenv is properly set up using this rbenv-doctor script:
$ curl -fsSL https://github.com/rbenv/rbenv-installer/raw/master/bin/rbenv-doctor | bash
$ rbenv install -l
$ ruby -v
ruby 2.3.7p456 (2018-03-28 revision 63024) [universal.x86_64-darwin18]
$ rbenv install 2.6.3
$ gem install jekyll bundler
```

### Create your site

```sh
jekyll new my-awesome-site
~ $ cd my-awesome-site
~/my-awesome-site $ bundle exec jekyll serve
```

## Tips'n Tricks

### Add internal link in post


{% raw %}
```
[previous post]({% post_url 2015-06-06-how-easily-create-mobile-app-phonegap %})
```
{% endraw %}


### Add link within page

kramdown supports the automatic generation of header IDs if the option auto_ids is set to true (which is the default). This is done by converting the untransformed, i.e. plain, header text

So for `## Section 1`, it would generate the following id: `id="section-1"`, then in plain kramdown/markdown the anchor is linked to via:

`[Section 1](#section-1)`

### Render Tables with kramdown

>  A line starting with a pipe character `|` starts a table row. However, if the pipe characters is immediately followed by a dash (-), a separator line is created

Source: [http://kramdown.gettalong.org/quickref.html#tables](http://kramdown.gettalong.org/quickref.html#tables)

### Line break
We should use the ["secret" MD's two-space line breaks](http://meta.stackexchange.com/questions/40976/what-is-the-reason-for-the-top-secret-two-space-newline-markdown-weirdness). Digit two empty space and a break-line (enter).


### Open links in a new window, target=_blank

Most Markdown engines I've seen allow plain HTML

```html
<a href="http://example.com/" target="_blank">Hello, world!</a>
```

Source: [http://stackoverflow.com/questions/4425198/markdown-target-blank](http://stackoverflow.com/questions/4425198/markdown-target-blank)

### Writing Liquid Template in Markdown Code Blocks
When I was writing another blog post on listing blog posts by tags in Jekyll, I came across a curious problem when I try to write liquid template code in my markdown file. Evidently, when Jekyll compiles the static web files, it tries to process all the double curly brackets like {% raw %}{% and %}{% endraw %}, which of course leads to errors.

One option is to use [Liquid’s raw tag](https://shopify.github.io/liquid/tags/raw/). Raw temporarily disables tag processing. The markdown code would then be something like this:

![jekyll-raw-tag]({{ site.BASE_PATH }}/assets/media/jekyll/raw-tag.png)

[Source](http://ozzieliu.com/2016/04/26/writing-liquid-template-in-markdown-with-jekyll/)

### Code Highlighting: Embedded GitHub Gists
Improve Code Highlighting in a Jekyll-based Blog Site

Install gem [jekyll-gist](https://github.com/jekyll/jekyll-gist)

```sh
$ gem install jekyll-gist
```

Add the following to your site's _config.yml:

```yaml
gems: [jekyll-gist]
```

Here's an example of how to embed a Gist on GitHub Pages:

{% raw %}{% gist 5555251 %}{% endraw %}

All you need to do is copy and paste the Gist's ID from the URL (here 5555251), and add it to a gist tag surrounded by {% raw %}{% and %}{% endraw %}.

### JS hook
Add following snippet on `/assets/js/app.js`, all links on posts will open on new window. It includes internal links.

```js
// prevent line-breaks in links and make open in new tab
$('div.article_body a')
	.not('[rel="footnote"], [rev="footnote"]')
	.html(function(i, str) {
		return str.replace(/ /g,'&nbsp;');
	})
	.attr('target','_blank');
```

Source: [http://mrloh.se/2015/05/bending-markdown-for-jekyll-and-github-pages/](http://mrloh.se/2015/05/bending-markdown-for-jekyll-and-github-pages/)

### Comment

[Kramdown comment syntax](https://kramdown.gettalong.org/syntax.html#extensions)

```
{::comment}
 here's my comment
{:/comment}
```

## Jekyll Themes

- [themes.jekyllrc.org](http://themes.jekyllrc.org/)
- [jekyllthemes.io](https://jekyllthemes.io/)
- [jekyllthemes.org](http://jekyllthemes.org/)

## Furthermore

- [http://www.chrisgmyr.com/2015/02/finally-moved-my-blog-to-jekyll/](http://www.chrisgmyr.com/2015/02/finally-moved-my-blog-to-jekyll/)
- [Build a Jekyll blog in minutes](https://github.com/barryclark/jekyll-now)
- [GitHub Help. Working with GitHub Pages](https://help.github.com/en/github/working-with-github-pages)
- [Jekyllrb: GitHub Pages](https://jekyllrb.com/docs/github-pages/)
- [Official GitHub Pages](https://pages.github.com/)