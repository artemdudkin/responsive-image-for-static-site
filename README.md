# responsive-image-for-static-site

Search for all html files at specified folder, then get all &lt;img&gt; and creates set of cache files for responsive image loading (100px, 200px, ... 1500px); also add some scripts to make it all work (i.e. to load image of appropiate size).

## Installation

```
npm install --save-dev responsive-image-for-static-site
```

## Usage
Call it with two mandatory params: (1) folder of html files and (2) folder for set of cache files

``` javascript
  node node_modules/responsive-image-for-static-site/index.js ./ ./cahceFolder
```
