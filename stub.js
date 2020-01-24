var piImg = [];
$('[pi-stub]').forEach( el => {
  piImg.push(el);
  const srcStub = el.getAttribute('pi-stub');
  const srcOriginal = el.getAttribute('pi-original');
  stubAndLoad(el, srcStub, srcOriginal);
});

$(window).resize( event => {
  piImg.forEach( el => {
    let w = 800;
    try {w = +el.getAttribute('pi-width'); } catch(e) {}
    if ( w < el.offsetWidth) {
      const srcOriginal = el.getAttribute('pi-original');
      stubAndLoad(el, el.src, srcOriginal); 
    }
  });
});

function stubAndLoad(el, srcStub, srcOriginal) {
  const width = el.offsetWidth;

  const container = $('<div></div>')[0];
  const stub = $('<img></img>')[0];

  let w = Math.round(width*1.5/100)*100; 
  el.setAttribute('pi-width', "" + w);
  el.src = (w <= 1500 ? getCacheFileName( srcOriginal, w, "cache") : srcOriginal);
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