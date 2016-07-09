## Overlap two div

http://jsfiddle.net/adelassi/wC36D/1/

## Vertical align anything

```css
.parent-element {
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.element {
  position: relative;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
```

http://zerosixthree.se/vertical-align-anything-with-just-3-lines-of-css/
## Vertically align an image

A PURE CSS Solution:

<div class="frame" style="height: 25px;">
    <img src="http://jsfiddle.net/img/logo.png" />
</div>

.frame {  
    margin: 1em 0;  
    height: 35px;
    width: 160px;
    border: 1px solid red;
    position: relative;
}  
img {  
    max-height: 25px;  
    max-width: 160px;  
    position: absolute;  
    top: 0;  
    bottom: 0;  
    left: 0;  
    right: 0;  
    margin: auto;  
    background: #3A6F9A;  
}
Key stuff

// position: relative; - in .frame holds the absolute element within the frame
// top: 0; bottom: 0; left: 0; right: 0; - this is key for centering a component
// margin: auto; - centers the image horizontally & vertically

## Horizontally center a div
If you don't want to set a fixed width on the inner div you could do something like this:

```css
#outer {
  width: 100%;
  text-align: center;
}

#inner {
  display: inline-block;
}
```
That makes the inner div into an inline element that can be centered with text-align.

## Truncate String with Ellipsis
```css
.truncate {
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```
https://css-tricks.com/snippets/css/truncate-string-with-ellipsis/