# responsive-image-for-static-site

1. **Responsive images.** If you have images at your site, and if your client use slow connection, then images loads slowly even if most of users use smartphones and do not need large images of high quality (as screen of smartphone is rather small). On the other hand you want good quality (because it sells, of course). "Responsive image" to the resque! (i.e. browser should load image of appopriate size - large image for big displays and small image for smartphones). 

2. **Progressive images.** Again, with slow connection and set if images, user will see rendered site in a while... Not very good. And they  use simple desicion - to add blurred low quality image instead of original, then wait until original image loads, and then replace blurred image with original image. 

But what if you have good old static site? You cannot use all that stuff. But! You can use `responsive-image-for-static-site`.

## How it works

This lib search for all html files at specified folder, then get all images from that files, then creates set of cache files for responsive image loading (100px, 200px, ... 1500px); also add some scripts to html files to make it all work (i.e. to load image of appropiate size) and adds stub (blurred) image to all &lt;img&gt; tag.

## How it looks like
```html
 <img src="img/item42/sample.jpg">
```
becomes
```html
 <img src="cacheFolder/58a2fca2.jpg" rifs-stub="data:image/png;base64,iVBOR..." rifs-original="img/item42/sample.jpg">
```
with some js scripts added at the end of the html file.

## Installation

```
npm install -g responsive-image-for-static-site
```

## Usage
Call it with two mandatory params: (1) folder of html files and (2) folder for set of cache files

``` javascript
  rifs . cacheFolder
```

## Sample
![demo-animated-gif](https://github.com/artemdudkin/responsive-image-for-static-site/blob/master/docs/fly.gif?raw=true)

