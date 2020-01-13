---
layout: post
title: 'How to create a Jekyll website with useful plugins'
categories: [jekyll]
tags: []
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

As you may already know [Jekyll](https://jekyllrb.com) is a blog-aware static site generator in Ruby. The aim of this post is to explain how to create a jekyll website with some useful plugins, as SEO, Analytics, etc. It's a hands-on tutorial.
![jekyll-github-pages]({{ site.BASE_PATH }}/assets/media/jekyll/jekyll_red_black.png)


For details of Jekyll installation I recommend to read Official doc [Getting started](https://jekyllrb.com/docs/). And for some tips and basic concepts of Jekyll, check my previous post [Getting started with Jekyll]({% post_url 2015-08-11-getting-started-jekyll-github-pages %}).

## Setup
### Prerequisites
Jekyll is a [Ruby Gem](https://jekyllrb.com/docs/ruby-101/#gems) that can be installed on most systems. Check on [Jekyll installation](https://jekyllrb.com/docs/installation/) how to setup your environment.

```bash
$ ruby -v
ruby 2.6.2p47 (2019-03-13 revision 67232) [x86_64-darwin18]
$ bundle exec jekyll -v
jekyll 3.8.5
$ bundle exec gem list jekyll

*** LOCAL GEMS ***

jekyll (3.8.5)
```

### New Jekyll Project

```bash
$ jekyll new meu-starter.blank.jekyll-v3.8.5
Running bundle install in /Users/vdias/Dvpt/PROJECTS/meu-starter.blank.jekyll-v3.8.5... 


Your user account isn\'t allowed to install to the system RubyGems.
  You can cancel this installation and run:

      bundle install --path vendor/bundle

  to install the gems into ./vendor/bundle/, or you can enter your password
  and install the bundled gems to RubyGems using sudo.

  Password: 
  
$ cd meu-starter.blank.jekyll-v3.8.5
$ bundle install --path vendor/bundle
```

And run to test with `$ bundle exec jekyll serve`

## Change gem-based theme
When you create a new Jekyll site (by running the `jekyll new <PATH>` command), Jekyll installs a site that uses a [gem-based theme](https://jekyllrb.com/docs/themes/) called [Minima](https://rubygems.org/gems/minima).

With gem-based themes, some of the site’s directories (such as the assets, _layouts, _includes, and _sass directories) are stored in the theme’s gem, hidden from your immediate view. Yet all of the necessary directories will be read and processed during Jekyll’s build process.
To locate theme’s files on your computer run `bundle show` followed by the name of the theme’s gem, e.g., `bundle show minima`.

The goal of gem-based themes is to allow you to get updates by running `bundle update <THEME>`.

Jekyll themes set default layouts, includes, and stylesheets. However, you can [override any of the theme defaults](https://jekyllrb.com/docs/themes/#overriding-theme-defaults) with your own site content making a copy in your local of the specific file you wish to modify.

1. Add the theme gem to your site’s `Gemfile`  
Replace gem "minima", "~> 2.0" on `Gemfile` with the gem you want, e.g: evie-jekyll  
`gem "evie-jekyll", ">= 1.0 "`
2. Install the gem  
`$ bundle install`
3. Add the theme to your site’s `_config.yml`
`theme: evie-jekyll`
Depending on the theme you choose, maybe you should update/replace your index file, it's the case here, I've removed the `index.md` and copy from evie-jekyll theme the `index.html`.
4. Build your site  
`$ bundle exec jekyll serve`

## Add Atom feed
By default you should have [jekyll-feed](https://github.com/jekyll/jekyll-feed) plugin installed. The plugin will automatically generate an Atom (RSS-like) feed at `/feed.xml`.

## Add SEO metadata tags
Plugin [jekyll-seo-tag](https://github.com/jekyll/jekyll-seo-tag) add metadata tags for search engines and social networks to better index and display your site's content.

To install you should repeat commands below:

1. Add the plugin gem to your site’s `Gemfile` 
```ruby
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.6"
  gem 'jekyll-seo-tag'
end
```

2. Install the gem 
`$ bundle install`

3. Add the plugin to your site’s `_config.yml`  
```yaml
plugins:
  - jekyll-feed
  - jekyll-seo-tag
```

4. Add the following right before `</head>` in your site's template(s)
`{% raw %}{% seo %}{% endraw %}`

OBS: The plugin add `title` tag on each page, but you can [disable `<title>` output](https://github.com/jekyll/jekyll-seo-tag/blob/master/docs/advanced-usage.md#disabling-title-output) it not wanted.

In `evie-jekyll` theme the head is within `_includes` directory. We should copy it from gem to local directory (`LOCAL$ _includes/head.html`) to update it.

By default `jekyll-seo-tag` should auto-fill SEO metadata tags with your site's `_config.yml`. To provide more informations I recommend to read [jekyll-seo-tag usage](https://github.com/jekyll/jekyll-seo-tag/blob/master/docs/usage.md).

## Add sitemap
[jekyll-sitemap](https://github.com/jekyll/jekyll-sitemap/) plugin silently generate a sitemaps.org compliant sitemap for your Jekyll site

1. Add the plugin gem to your site’s `Gemfile`  
```ruby
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.6"
  gem 'jekyll-seo-tag'
  gem 'jekyll-sitemap'
end
```
2. Install the gem 
`$ bundle install`
3. Add the plugin to your site’s `_config.yml`  
```yaml
plugins:
  - jekyll-feed
  - jekyll-seo-tag
  - jekyll-sitemap
```

The plugin will automatically generate a sitemap at `/sitemap.xml`.

## Add Google Analytics
[jekyll-analytics](https://github.com/hendrikschneider/jekyll-analytics/) connect your wesite to its Google Analytics Account.

1. Add the plugin gem to your site’s `Gemfile`  
```ruby
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.6"
  gem 'jekyll-seo-tag'
  gem 'jekyll-sitemap'
  gem 'jekyll-analytics'
end
```
2. Install the gem 
`$ bundle install`
3. Add the plugin to your site’s `_config.yml`  
```yaml
plugins:
  - jekyll-feed
  - jekyll-seo-tag
  - jekyll-sitemap
  - jekyll-analytics
```
4. Configure the plugin in `_config.yml` by adding
```yaml
jekyll_analytics:
  GoogleAnalytics:          # Add, if you want to track with Google Analytics
  id: UA-123-456          # Required - replace with your tracking id
```

Tracking will be disabled in development mode. To enable production mode set enviroment variable `JEKYLL_ENV=production`. Github pages automatically sets JEKYLL_ENV to production. For testing use

```bash
$ JEKYLL_ENV=production bundle exec jekyll serve
```

## Responsive images
[jekyll-picture-tag](https://github.com/rbuchberger/jekyll-picture-tag) is a liquid tag that adds responsive images to your Jekyll static site. It automatically creates resized, reformatted source images.

1. Add the plugin gem to your site’s `Gemfile`  
```ruby
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.6"
  gem 'jekyll-seo-tag'
  gem 'jekyll-sitemap'
  gem 'jekyll-analytics'
  gem 'jekyll-picture-tag', git: 'https://github.com/rbuchberger/jekyll-picture-tag/'
end
```
2. Install the gem 
`$ bundle install`
3. Add the plugin to your site’s `_config.yml`  
```yaml
plugins:
  - jekyll-feed
  - jekyll-seo-tag
  - jekyll-sitemap
  - jekyll-analytics
  - jekyll-picture-tag
```
4. Use liquid tag wherever you want on your wbsite's pages, ie:  
{% raw %}
`{% picture assets/images/jekylll/jekyll_red_black.png %}`
{% endraw %}

## Repository
All source code can be found on GitHub: [https://github.com/meumobi/meu-starter.blank.jekyll-v3.8.5](https://github.com/meumobi/meu-starter.blank.jekyll-v3.8.5)

## More recommended plugins
- [jekyll-assets](https://github.com/envygeeks/jekyll-assets)
- [jekyll-toc](https://github.com/toshimaru/jekyll-toc/)
- [jekyll-redirect-from](https://github.com/jekyll/jekyll-redirect-from/)
- [jekyll-admin](https://github.com/jekyll/jekyll-admin/)

## Furthermore
- [Top Jekyll plugins](https://planetjekyll.github.io/plugins/top)
- [Install Jekyll on macOS Mojave](https://desiredpersona.com/install-jekyll-on-macos/)