---
layout: post
title: Theming your Ionic App
categories: [Ionic]
tags: [tutorial]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

Ionic App are packaged with default themes optimized for each platforms (iOS, Android, Windows). But Ionic Framework also provide a easy to setup interface to customize your App as you like.

## Changing theme
[Changing the theme](https://ionicframework.com/docs/theming/theming-your-app/) is as easy as updating the $colors map in your `src/theme/variables.scss file`:

```scss
$colors: (
  primary:    #f7ce06,
  secondary:  #32db64,
  danger:     #f53d3d,
  light:      #f4f4f4,
  dark:       #222
);
```
The fastest way to change the theme of your Ionic app is to set a new value for `primary`, since Ionic uses the `primary` color by default to style most components. Colors can be removed from the map if they aren’t being used, but `primary` should not be removed.

## Overriding Ionic Sass variables
For in deep customization, there are many [variables you can override with Ionic](https://ionicframework.com/docs/theming/overriding-ionic-variables/) from your `src/theme/variables.scss` file, just add a new value to the file.

For example, if we pretend to change toolbar background and text colors, we'll add:

```sass
$colors: (
  primary:    #f7ce06, // infomobi: #f7ce06, default: #488aff
  light:      #f4f4f4,
  dark:       #000
);

$tabs-background:                     color($colors, dark);
$tabs-tab-color-active:               color($colors, light);

$toolbar-background:                   color($colors, dark);
$toolbar-active-color:                 color($colors, light);

$searchbar-ios-toolbar-input-background: #fff;
```

See below the result of customization

|Without customization| With customization|
|--|--|
|![Ionic App without customization]({{ site.BASE_PATH }}/assets/media/ionic/Screenshot_theming-2.png)|![Ionic App with customization]({{ site.BASE_PATH }}/assets/media/ionic/Screenshot_theming-1.png)|


You can also find all Sass variable of an UI component on its doc, for example [component Tabs](https://ionicframework.com/docs/api/components/tabs/Tabs/#sass-variables).

# Change font
https://forum.ionicframework.com/t/how-to-change-the-font-of-all-texts-in-ionic/30459/5

# Change font-size
From your `src/theme/variables.scss` file, set the required value, for example:

```css
$font-size-base: 1.6rem;
```

# Furthermore
- [A Guide to Styling an Ionic Application](https://www.joshmorony.com/a-guide-to-styling-an-ionic-2-application/)