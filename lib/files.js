const parse5 = require('parse5'),
      fs   = require('fs'),
      path = require('path');
const addScripts = require('./scripts');
const processImages = require('./images');
const getByTagName = require('./common');

/**
 * Find all files by mask at current folder
 * (recursive=true - including subfolders)
 * 
 * [from https://stackoverflow.com/questions/25460574/find-files-by-extension-html-under-a-folder-in-nodejs]
 */
function findFilesByMask(startPath, filter, recursive){
  let ret = [];
  if (!fs.existsSync(startPath)){
    throw new Error("No dir '" + startPath + "'");
  }

  var files=fs.readdirSync(startPath);
  for(var i=0;i<files.length;i++){
    var filename=path.join(startPath,files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory() && recursive) {
      ret = ret.concat(fromDir(filename,filter,recursive));
    } else if (filename.indexOf(filter)>=0) {
      ret.push(filename);
    };
  };
  return ret;
};


/** 
 * Reads and parses html file, finds all <img> and adds tumbnails, then rewrites file
 *
 * @returns Promise 
 */
function processFile( filename, cacheFolder) {
  return new Promise((resolve, reject) => {
    fs.stat(cacheFolder, (err, stat) => {
      if (err && (err.code === 'ENOENT' || err.code === 'ENOTDIR')) {
        reject('Cannot find folder "' + cacheFolder + '"');
      } else {
        resolve();
      }
    })
  })
  .then(() => {
    const data = fs.readFileSync(filename).toString();
    const html = parse5.parse(data);
    const imgs = getByTagName('img', html);
    if (imgs.length > 0 ) {
      return Promise.resolve()
      .then(() => {
        return processImages(html, cacheFolder);
      })
      .then(() => {
        return addScripts(html, cacheFolder);
      })
      .then(() => {
        fs.writeFileSync(filename, parse5.serialize(html))
      });
    }
  });
}

module.exports = { findFilesByMask, processFile };