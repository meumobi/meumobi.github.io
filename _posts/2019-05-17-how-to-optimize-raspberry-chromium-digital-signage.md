---
layout: post
title: How to optimize Chromium on Raspberry for Digital Signage
categories: [How To]
tags: [tutorial,raspberry,chromium,digital-signage,tv]
author:
  name: Daniel Antonio Conte
  email: danconte72@gmail.com
  github: danconte72
  twitter: danielconte
  bio: Life, Universe, Everything
  email_md5: 8200df29874231d4d8c2c7beae170b31
---
![Raspberry PI Assembled]({{ site.BASE_PATH}}/assets/media/rasp2.jpg)
We’ve been working with Raspberry Pi in order to offer a TV extension of our services.
This post is one of a series which shows how we did.

In this article we will point some settings who can improve rendering performance on Chromium. 


## What do you need? ##
- A raspberry with chromium installed. [How to :)](http://meumobi.github.io/how%20to/2019/05/14/how-to-raspberry-digital-signage.html)

## How to mesure ##
In order to check if our hacks are working we need metrics.
We use these:
- [Monitoring Raspberry PI with RPi-Monitor](https://www.filipeflop.com/blog/monitorando-raspberry-pi-com-rpi-monitor/)
- [Analyzing Runtime Performance](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/)   
- [FPS Meter of rendering settings](https://developer.chrome.com/devtools/docs/rendering-settings#show-fps%20meter)

## Improvements ##
### Enable Hardware Acceleration ###
- Access `chrome://settings/` 
- On Advanced>System set [Use hardware acceleration when available](https://www.lifewire.com/hardware-acceleration-in-chrome-4125122) 
- And click on `Restart`

### GPU Rasterization ###
- Access `chrome://flags/` 
- Set [GPU Rasterization](chrome://flags/#enable-gpu-rasterization) to `Force-enabled for all layers`
- And click on `Relaunch Now`

### Tests ###
- [Before](https://drive.google.com/open?id=1n4prcSys4z86R3GNEtAEa0YYZOmtaJIC)
![Before]({{ site.BASE_PATH}}/assets/media/before.jpg)

- [After](https://drive.google.com/open?id=1e7pK8ZiVYYRb293qJFcZoW4sXqHz8bK6)
![Raspberry PI Assembled]({{ site.BASE_PATH}}/assets/media/rasp2.jpg)
![After]({{ site.BASE_PATH}}/assets/media/after.jpg)
