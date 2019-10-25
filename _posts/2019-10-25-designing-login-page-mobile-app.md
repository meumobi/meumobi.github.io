---
layout: post
title: Design login page UI for mobile App
categories: [Ionic]
tags: [ionic, design, login, UI]
author:
  name: Victor Dias
  email: victor.dias@meumobi.com
  github: elbidone
  twitter: meumobi
  bio: Sharing mobile Experiences
  email_md5: 1cd012be2382e755aa763c66acc7cfa6
---

We are currently working on a large refactoring of our product, infomobi, a mobile App to manage companies internal communication. And today I've decided to work on UI of our login page, I have no UI/UX skills, my objective was to build up something as state of the art, it's this journey I'd like to share with you below and detail which tools I've used at each step.
![login-screenshot]({{ site.BASE_PATH }}/assets/media/login-design/login-page-sidesblurred.jpg)

It's a Ionic/Angular 4 project, then for anyone interested in source code drop a line on comment and I'll share it.


|circle gradient bg|solid bg picture|flat background|1st draft|previous version|
|---|---|---|---|---|
|![login-screenshot]({{ site.BASE_PATH }}/assets/media/login-design/Ionic_App_5.png)|![login-screenshot]({{ site.BASE_PATH }}/assets/media/login-design/Ionic_App_4.png)|![login-screenshot]({{ site.BASE_PATH }}/assets/media/login-design/Ionic_App_1.png)|![login-screenshot]({{ site.BASE_PATH }}/assets/media/login-design/Ionic_App.png)|![login-screenshot]({{ site.BASE_PATH }}/assets/media/login-design/infoMobi__Improve_Employee_Experience.png)|

## Objectives of login page
On table above I've represented all main stages of the creation process. I disliked the previous version because its lack of identiy, seems login form of admin panel, but the target audience of infomobi is not admin users. infomobi reach end users, means employees of client companies. Companies contract our service, we register them on infomobi and enable their employees login, by OAuth, or email/phone number authentication. So, the login page, also landing page, should be user firendly and attractive enough to lead user/employee to proceed on login. Then I've decided to add an illustration and a title, it was the 1st draft.
At this moment I've shared the draft with Daniel, my team mate and get following feedbacks:
- linear gradient on background seems old school, like 2000s websites.
- the login button disabled looks strange
- illustration has too much details, should be simpler.

## Flat background
### Palette colors
The main color of infomobi is yellow #FEC501, it's the color used on our logo. I've used [paletton.com](http://paletton.com/#uid=31g0u0kvSvSjrC+oIxLxLoIC+jr) to create a plalette of 3 colors. From this palette I get a complementary blue #0F55A6 and purle #5C13AB. To replace the gradient background I've choose the blue background, well... looks better.

![paletton]({{ site.BASE_PATH }}/assets/media/login-design/Paletton_-_The_Color_Scheme_Designer.png)

### Illustration svg
To find an illustration I've browsed the [undraw.co](https://undraw.co/illustrations) lib, there are plenty of svg graphics you can customize with your own brand color.

![undraw]({{ site.BASE_PATH }}/assets/media/login-design/Illustrations___unDraw.png)

### Edit svg
undraw site allows to import svg with your own. But on the svg I choose there's a "misterious shape" on center using solid yellow with opacity that doesn't render very well. To remove it I use the great [online svg editor: editor.method.ac](https://editor.method.ac/), amazing tool, very easy to use.

![method draw]({{ site.BASE_PATH }}/assets/media/login-design/Method_Draw.png)

## Solid bg picture
Once removed the mysterious shape on center the illustration miss something to join elements. So we've decided to set back the shape but update the color and remove the opacity. To choose a color we make few tests of tint and shade colors of ou yellow base color and its complementary blue (extracted from palette as mentioned above). To achieve it we used another great online tool [Tint & Shade Generator](https://maketintsandshades.com/#0F55A6).

![maketintsandshades]({{ site.BASE_PATH }}/assets/media/login-design/Tint_and_Shade_Generator.png)

To update opacity and color of shape I needed to edit the svg. SVG is an XML not so easy to read, then to know which node is responsible for the shape I've put back the shape, removed on previous action, and replace its color to something new and unique. When done, I save the svg locally and open it on a text editor to look for the new color, instantly I reach the XML node of the shape and identify the properties to update color and opacity.

## Circle gradient background
And, cherry on the cake, Daniel suggested a last update that make all difference, replace solid bg by a radial gradient, [mycolor.space](https://mycolor.space/gradient?ori=circle&hex=%235788C1&hex2=%230F55A6&sub=1) is the best tool to do it. We get 2 tints of our blue color, and mycolor.space do the job, it generates the css entry to apply on our login page.

![mycolor.space]({{ site.BASE_PATH }}/assets/media/login-design/ColorSpace_-_CSS_Gradient_Color_Generator.png)

## Conclusion
On this journey I leave my code editor to discover some new awesome easy to use tools. The feedbacks of my team mate Daniel were very important to reach the final result, and I should declare I like it very much! ;-)
Hope it helps you, if you'd like to see the source code of the login page drop a line on comment and I'll share it.
