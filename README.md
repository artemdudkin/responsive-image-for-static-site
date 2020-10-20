# responsive-image-for-static-site

Problem: 
if you have high-quality images at website then slow connection can produce bad user experience, because images loads slowly.

Solution:
1. **Responsive images**. Most of users use smartphones and do not need big images (because screen of smartphone is rather small). On the other hand, you want good quality (because it sells, of course). I.e. browser should load image of appopriate size - large image for big displays and small image for smartphones).

2. **Progressive images** - you can show low-quality small-sized (may be, blurred) image stub while high-quality image loads. Looks nice (see example picture below).

3. But what if you have good old static site? You cannot use all that stuff. But you can use `responsive-image-for-static-site`.

(&#128679; under construction - see TODOs at [cli.js](cli.js))

## How it works

This lib search for all html files at specified folder, then parse it to get all images from &lt;img&gt; tags, then creates set of cache files for responsive image loading (100px, 200px, ... 1500px), and adds stub (blurred) image to all &lt;img&gt; tags; also add some scripts to html files to make it all work (i.e. to apply stub images and to load image of appropiate size).

## Under the hood
```html
 <img src="img/item42/sample.jpg">
```
becomes
```html
 <img src="cacheFolder/58a2fca2.jpg" rifs-stub="data:image/png;base64,iVBOR..." rifs-original="img/item42/sample.jpg">
```
with some js scripts added at the end of the html file (if JS turned off then it loads 800px image).

## Installation

```
npm install -g responsive-image-for-static-site
```

## Usage
There are two mandatory params: (1) folder of html files and (2) folder for set of cache files

``` javascript
  rifs . cacheFolder
```

## How it looks like
![demo-animated-gif](https://github.com/artemdudkin/responsive-image-for-static-site/blob/master/docs/fly.gif?raw=true)

