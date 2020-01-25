var piImg = [];
$('[rifs-stub]').forEach( el => {
  piImg.push(el);
  const srcStub = el.getAttribute('rifs-stub');
  stubAndLoad(el, srcStub);
});

$(window).resize( event => {
  piImg.forEach( el => {
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

  const container = $('<div></div>')[0];
  const stub = $('<img></img>')[0];

  let w = Math.round(width*1.5/100)*100; 
  if (w <= 1500) {
    el.setAttribute('rifs-width', "" + w);
    el.src = getCacheFileName( srcOriginal, w, "{{cacheFolder}}");
  } else {
    el.setAttribute('rifs-width', 'original');
    el.src = srcOriginal;
  }
  const onLoadFunc = () => {
    $(stub).remove();
    $(el).show();
    el.removeEventListener('load', onLoadFunc);
  }
  $(el)
    .hide()
    .load( onLoadFunc);

  el.parentNode.replaceChild( container, el);
  container.appendChild(el);

  stub.src = srcStub;
  $(stub).css('filter:blur(10px)');
  container.appendChild(stub);
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