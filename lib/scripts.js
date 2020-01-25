const fs = require('fs');
const path = require('path');
const terser = require('terser');
const getByTagName = require('./common');

const EMBED_PREFIX = 'rifs';
const EMBED_SCRIPTS = [require.resolve('jq-min'), path.join(__dirname, '../script/stub.js')];

function addScripts( html, cacheFolder) {
  const prefix = '/*' + EMBED_PREFIX + '-scripts' + '*/';
  replaceOrAppendScript( html, prefix, getScripts(cacheFolder));
}

function getScripts( cacheFolder) {
  return EMBED_SCRIPTS.reduce( (ret, fn) => {
      let text = fs.readFileSync( fn).toString();
      text = text.replace(/{{cacheFolder}}/, cacheFolder);
      const {code, error} = terser.minify(text, {output: {inline_script : false}});
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
  const script = {nodeName: 'script', tagName:'script', attrs:[], childNodes: []};
  script.childNodes.push({nodeName:'#text', value: text, parentNode: script})

  const body = getByTagName('body', html)[0];
  body.childNodes.push(script);
  body.childNodes.push({nodeName:"#text", value:"\r\n"});
}

module.exports = addScripts;