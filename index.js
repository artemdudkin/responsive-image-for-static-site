const logger = require('./lib/logger');
const { findFilesByMask, processFile } = require('./lib/files');
const addScripts = require('./lib/scripts');
const getByTagName = require('./lib/common');
const processImages = require('./lib/images');

module.exports = {
  logger, findFilesByMask, processFile, addScripts, getByTagName, processImages
};
