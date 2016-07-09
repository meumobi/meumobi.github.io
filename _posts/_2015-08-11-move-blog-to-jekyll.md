http://joshualande.com/jekyll-github-pages-poole/
http://www.chrisgmyr.com/2015/02/finally-moved-my-blog-to-jekyll/

# Add internal link in post
```
[previous post]({% post_url 2015-06-06-how-easily-create-mobile-app-phonegap %})
```

# Render Tables when use Redcarpet in Jekyll
Adding only markdown: redcarpet into _config.yml is not enough, It's also need the extensions part.

```
markdown: redcarpet
redcarpet:
  extensions: ["no_intra_emphasis", "fenced_code_blocks", "autolink", "tables", "with_toc_data"]
```
	
from the [Jekyll documentation](jekyllrb.com/docs/configuration/#redcarpet). And theese are the Redcarpet extensions, from the [Readme](git.io/Xk0CQQ)

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