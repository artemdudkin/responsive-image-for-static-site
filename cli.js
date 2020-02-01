#!/usr/bin/env node

//TODO test lib on regular pages from the net

//TODO do not replace img with stub if img already loaded (at the cache already)
//TODO unit-tests

//TODO noConflists ($ is common with jQuery)
//TODO add option "recursive search html"
//TODO add option "do not modify scripts"
//TODO add option "update only image cache / only scripts"
//TODO add option "replace jq-min with jquery" 
//TODO add option "set cached image size step" (100px by default)
//TODO add option "set cached image max size" (1500px by default)
//TODO add option "set default cached image size" (800px by default)

const path = require('path');
const logger = require('./lib/logger');
const { findFilesByMask, processFile } = require('./lib/files');


if (!process.argv[2] || !process.argv[3]) {
  console.log("\n  Usage: node index.js <path> <cacheFolder>");
} else {
  let ret = [];
  const htmlFiles = findFilesByMask(process.argv[2],'.html');
  const cacheFolder = process.argv[3];

  logger.setStubCount(15);
  logger.setFileCount(htmlFiles.length);
  logger.start();

  htmlFiles
    // process files one by one (to save memory)
    .reduce((p, fn) => {
      return p.then( res => {
        logger.incFileCounter();
        return processFile(fn, cacheFolder)
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
