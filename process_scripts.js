const fs = require('fs');
const path = require('path');
const terser = require('terser');
const getByTagName = require('./process_common');

const EMBED_PREFIX = 'pi';
const EMBED_SCRIPTS = ['node_modules/jq-min/index.js', 'stub.js'];

function addScripts( html, homeFolder) {
  const prefix = '/*' + EMBED_PREFIX + '-scripts' + '*/';
  replaceOrAppendScript( html, prefix, getScripts(homeFolder));
}

function getScripts( homeFolder) {
  return EMBED_SCRIPTS.reduce( (ret, fn) => {
      const text = fs.readFileSync( path.join(homeFolder, fn)).toString();
      const {code, error} = terser.minify(text, {output: {inline_script : false}});
//      const {code, error} = {code:text, error:undefined};
      if (error) throw new Error(error);
      return ret + '\r\n ' + code;
  }, '') + '\r\n';
}

function replaceOrAppendScript( html, prefix, code) {
  let found = false;

  getByTagName('script', html)
    .map(_ => _.childNodes[0])
    .forEach( node => {
      if (node && typeof(node.value)==='string' && node.value.startsWith(prefix)) {
        node.value = prefix + ' ' + code;
        found = true;
      }
    });
  if (!found) appendScript(html, prefix + ' ' + code);
}

function appendScript( html, text) {
  const body = getByTagName('body', html)[0];
  body.childNodes.push({nodeName: 'script', tagName:'script', attrs:[], childNodes: [{nodeName:'#text', value: text}]});
  body.childNodes.push({nodeName:"#text", value:"\r\n"});
}

module.exports = addScripts;