const fs = require('fs');
const sizeOf = require('image-size');
const sharp = require('sharp');
const getByTagName = require('./common');
const logger = require('./logger');

/** 
 * For (big) <img> adds attributes (tumbnails and original file)
 *
 * @returns Promise
 */
function processImages(html, cacheFolder) {
  const imgs = getByTagName('img', html);
  logger.addImageCount(imgs.length);
  return imgs
    .reduce((p, img) => {
      return p.then( res => processImg(img, cacheFolder));
    }, Promise.resolve());
}

/** 
 * For imgObj adds attributes (tumbnails and original file)
 *
 * @returns Promise
 */
function processImg(imgObj, cacheFolder) {
    let ret = undefined;
    const src = (imgObj.attrs.filter(_=>_.name==='rifs-original')[0] || imgObj.attrs.filter(_=>_.name==='src')[0] || {}).value;
    const srcSize = sizeOf(src);
    if (srcSize.height > 100) {
      ret = sharp(src)
        .resize(20)
        .toFormat('png')
        .toBuffer()
        .then( srcStub => {
          addOrReplace( imgObj.attrs, "rifs-stub", 'data:image/png;base64,' + srcStub.toString('base64'));
          addOrReplace( imgObj.attrs, "rifs-original", src);
          addOrReplace( imgObj.attrs, "src", getCacheFileName(src, 800, cacheFolder));
        })
        .then( () => {
          return generateCache(src, cacheFolder);
        })
    }
    return ret;
}

/** 
 * At array of objects {name, value} finds object by name and replace its value,
 * and if it was not found then adds new object to array
 */
function addOrReplace(arr, name, value) {
  const obj = arr.filter( _ => _.name === name)[0];
  if (obj) {
    obj.value = value
  } else {
    arr.push({name, value});
  }
}

/**
 * Generate set of cache files cache for specified image and saves to <cacheFolder>
 *
 * @returns Promise
 */
function generateCache(src, cacheFolder) {
  let ret = [];
  for (var i=1; i<=15; i++) {
    ret.push( generateCacheFile(i, src, cacheFolder));
  }
  return Promise.all(ret)
}

/**
 * Resize of image to specified size (for cache)
 *
 * @returns Promise 
 */
function generateCacheFile(i, src, cacheFolder) {
  return sharp(src)
      .resize(i*100)
      .toFile( getCacheFileName(src, i*100, cacheFolder) )
        .then( () => {
          logger.stubDone(i, src);
        });
}

function hashCode(s) {
    for(var i = 0, h = 0; i < s.length; i++)
        h = Math.imul(31, h) + s.charCodeAt(i) | 0;
    return h;
}

function getCacheFileName( filename, width, cacheFolder) {
  const ext = filename.split('.').pop();
  return cacheFolder + "/" + hashCode(filename + "." + width + "w").toString(16) + "." + ext;
}

module.exports = processImages;