//TODO do not use <div> container
//TODO copy all attributes to stub image

//TODO add option "recursive search html"
//TODO add option "do not modify scripts"
//TODO add option "update only image cache / only scripts"
//TODO add option "replace jq-min with jquery"
//TODO add option "set cached image size step" (100px by default)
//TODO add option "set cached image max size" (1500px by default)
//TODO add option "set default cached image size" (800px by default)

const parse5 = require('parse5'),
      fs   = require('fs'),
      path = require('path');
const logger = require('./process_logger');
const addScripts = require('./process_scripts');
const processImages = require('./process_images');


if (!process.argv[2] || !process.argv[3]) {
  console.log("\n  Usage: node index.js <path> <cacheFolder>");
} else {
  let ret = [];
  const scriptHomeFolder = path.dirname(process.argv[1]);

  const htmlFiles = fromDir(process.argv[2],'.html');

  logger.setStubCount(15);
  logger.setFileCount(htmlFiles.length);
  logger.start();

  const cacheFolder = process.argv[3];

  htmlFiles
    .reduce((p, fn) => {
      return p.then( res => {
        logger.incFileCounter();
        return processFile(fn, cacheFolder, scriptHomeFolder)
      });
    }, Promise.resolve())
    .then( () => {
      logger.finish();
      console.log('Done.') 
    })
    .catch( (err) => {
      logger.finish();
      console.error("ERROR "+ err);
      console.error("CAUSED BY:\n" + err.stack);
    });
}

/**
 * Find all files by mask
 * (recursive=true - including subfolders)
 * 
 * [from https://stackoverflow.com/questions/25460574/find-files-by-extension-html-under-a-folder-in-nodejs]
 */
function fromDir(startPath, filter, recursive){
  let ret = [];
  if (!fs.existsSync(startPath)){
    throw new Error("no dir");
  }

  var files=fs.readdirSync(startPath);
  for(var i=0;i<files.length;i++){
    var filename=path.join(startPath,files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory() && recursive) {
      ret = ret.concat(fromDir(filename,filter,recursive)); //recurse
    } else if (filename.indexOf(filter)>=0) {
      ret.push(filename);
    };
  };
  return ret;
};


/** 
 * Reads and parses html file, finds all <img> and adds tumbnails
 *
 * @returns Promise 
 */
function processFile( filename, cacheFolder, scriptHomeFolder) {
  const data = fs.readFileSync(filename).toString();
  const html = parse5.parse(data);
  
  return Promise.resolve()
  .then(() => {
    return addScripts(html, scriptHomeFolder);
  })
  .then(() => {
    return processImages(html, cacheFolder)
  })
  .then(() => {
    fs.writeFileSync(filename, parse5.serialize(html))
  });
}
