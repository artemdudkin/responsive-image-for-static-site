var rifsImg = [];
$('[rifs-stub]').forEach( el => {
  rifsImg.push(el);
  const srcStub = el.getAttribute('rifs-stub');
  stubAndLoad(el, srcStub);
});

$(window).resize( event => {
  rifsImg.forEach( el => {
    const widthAttr = el.getAttribute('rifs-width');
    if (widthAttr !== 'original') {
      let w = 800;
      try { w = +widthAttr } catch(e) {}
      if (w < el.offsetWidth) stubAndLoad(el, el.src); 
    }
  });
});

function stubAndLoad(el, srcStub) {
  const srcOriginal = el.getAttribute('rifs-original');
  const width = el.offsetWidth;

  const stub = $('<img></img>')[0];
  // copy all attributes from el to stub
  for (var i=0; i<el.attributes.length; i++){
    const attrName = el.attributes[i].nodeName; 
    if (['src', 'rifs-stub', 'rifs-original', 'rifs-width'].indexOf(attrName) === -1) {
      stub.setAttribute(attrName, el.attributes[i].nodeValue);
    }
  }
  stub.src = srcStub;
  $(stub).css('filter:blur(10px)');

  el.parentNode.replaceChild( stub, el);
  $(el).hide();
  stub.parentNode.insertBefore( el, stub);

  let w = Math.round(width*1.5/100)*100; 
  if (w <= 1500) {
    el.setAttribute('rifs-width', "" + w);
    el.src = getCacheFileName( srcOriginal, w, "cache");
  } else {
    el.setAttribute('rifs-width', 'original');
    el.src = srcOriginal;
  }
  const onLoadFunc = () => {
    $(stub).remove();
    $(el).show();
    el.removeEventListener('load', onLoadFunc);
  }
  $(el).load( onLoadFunc);
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
