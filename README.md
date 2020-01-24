# responsive-image-for-static-site

If you have images at your site, and if your clients opens it at slow connection, then images loads slowly and it looks weird while most of users use smartphones and do not need large images of high quality (as screen of smartphone is rather small). On the other hand you want good quality (as it sells, of course). "Responsive image" to the resque! (i.e. browser should load image of appopriate size - large image for big displays and small image for smartphones). But what if you have good old static site? You have only one image here! Please use `responsive-image-for-static-site`.

This lib search for all html files at specified folder, then get all images from that files, then creates set of cache files for responsive image loading (100px, 200px, ... 1500px); also add some scripts to html files to make it all work (i.e. to load image of appropiate size).

## Installation

```
npm install --save-dev responsive-image-for-static-site
```

## Usage
Call it with two mandatory params: (1) folder of html files and (2) folder for set of cache files

``` javascript
  node node_modules/responsive-image-for-static-site/index.js ./ ./cahceFolder
```

## Sample
![demo-animated-gif](https://github.com/artemdudkin/responsive-image-for-static-site/blob/master/docs/demo.gif)

