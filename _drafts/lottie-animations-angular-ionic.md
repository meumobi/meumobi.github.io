

[Lottie](https://airbnb.design/lottie/) is a library that renders After Effects (AE) animations in real time, allowing apps to use animations as easily as they use static images. 
AE animations should be exported as json with Bodymovin plugin and rendered natively by lottie on mobile Apps and on the web with [lottie-web](https://github.com/airbnb/lottie-web)! Or you can browse [LottieFiles](https://lottiefiles.com/) and look for free and premium lottie animations of your choice that you can easily adapt ([lottie editor](https://lottiefiles.com/blog/updates/introducing-the-lottie-editor)) and use in your application or website.


## Manipulate your animation any way you like

- You can go forward, backward
- You can program your animation to respond to any interaction.
- You can update image, text and colors on loading

## Install Bodymovin
Bodymovin is a plugin for After Effects that can export animation in json data format for Lottie to use. I recommend [install bodymovin from aescripts](https://github.com/airbnb/lottie-web#plugin-installation).

## Angular and lottie
[ng-lottie](https://github.com/chenqingspring/ng-lottie)
[ngx-lottie](https://github.com/ngx-lottie/ngx-lottie)

## Change color of a animation file
In After Effects you can [assign a class (.) or tag (#) to the Fill or Stroke](https://github.com/airbnb/lottie-web/wiki/SVG-and-HTML-ids-and-classes-to-reference-via-css-or-select-via-Javascript) you want color control. In your shape Fill (often called 'Fill 1'), change the name to .fill1. And then you've created a tag that can be controlled with CSS or JS.

Then reassign the color in CSS like so:

```css
.fill1 {
  fill: red;
  stroke: red;
}
```

![lottie-fill-change-color]({{ site.BASE_PATH }}/assets/media/lottie/lottie-fill-change-color.png)

On json file colors rgb colored #FEC
0.996078431606 * 255 == 254 [or FE in Hex color](https://www.rapidtables.com/convert/color/rgb-to-hex.html)
0.772549033165 * 255 == 197 or C5 in Hex color
0.011764706112 * 255 == 3 or 03 in Hex color
1 => opacity


https://github.com/airbnb/lottie-web/issues/1666#issuecomment-555014164
https://github.com/airbnb/lottie-web/issues/646

## Preview lottie animation on lottie.cloud
https://lottie.cloud/app/


## How do i change the a single image in the lottie json file
https://stackoverflow.com/questions/49630767/how-do-i-change-the-a-single-image-in-the-lottie-json-file

## How do I change text
https://casparcgforum.org/t/lottie-bodymovin-html-template-help-needed/2325/3

## Add interactivity to affect elements within lottie animations
https://stackoverflow.com/a/53632919/4982169

## Adapt animation to mobile
https://developpaper.com/implementation-of-json-animation-in-html5-page/


## How it works
You can call lottie.loadAnimation() to start an animation. It takes an object as a unique param with:

### Local file
lottie.loadAnimation({
  container: element, // the dom element that will contain the animation
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'data.json' // the path to the animation json
});

### Remote file

lottie.loadAnimation({
  container: element, // the dom element that will contain the animation
  renderer: 'svg',
  loop: true,
  autoplay: true,
  animationData: data // an Object with the exported animation data.
});


## Furthermore

- [Example of icon animation](https://codepen.io/alexandredesign/pen/XzLQmj)
https://www.flowbase.co/guides/lottie-webflow
https://stackblitz.com/edit/mmb-lottie-performance?file=style.css
https://dev.to/teamhive/using-lottie-animations-inside-angular-or-ionic-4-5c48