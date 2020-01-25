
/** Resursively get all nodes at tree (by tagName) */
function getByTagName(tagName, node) {
  let ret = [];
  if (node.tagName === tagName) ret.push(node);
  (node.childNodes || []).forEach( node => ret = ret.concat(getByTagName(tagName, node)));
  return ret;
}

module.exports = getByTagName;

