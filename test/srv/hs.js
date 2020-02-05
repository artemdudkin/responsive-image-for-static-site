const http = require('http'),
      fs = require('fs'),
      path = require('path'),
      connect = require('connect'),
      bodyParser = require('body-parser'),
      querystring = require('querystring');

const STATIC_FOLDER = '../html';
const SERVER_PORT = 8080;
console.log('home dir == ' + process.cwd());
console.log('port == ' + SERVER_PORT);
console.log('STATIC_FOLDER == ' + STATIC_FOLDER);

var app = connect();

//process static files
app.use(function(req, res, next) {
  const fn = path.join(STATIC_FOLDER, req.url);
  fs.stat(fn, (err, stat) => {
    if (err && (err.code === 'ENOENT' || err.code === 'ENOTDIR')) {
      next();
    } else {
      const ext = path.extname(fn);
      let p = Promise.resolve();
      if (ext === '.jpg' || ext === '.png') {
        // delay images (to see image stubs working)
        p = new Promise((resolve, reject)=>setTimeout(()=>resolve(), 5000));
      }
      p.then(()=>{
        stream = fs.createReadStream(fn);
        stream.pipe(res);
        stream.on('error', (err) => {
          res.statusCode = 500;
          res.setHeader('content-type', 'text/plain');
          res.end('Server error: ' + err);
        });
      });
    }
  });
});

//json dynamic data
app.use(bodyParser.json())
    .use(function(req, res, next) {
	console.log('<< ' + req.url);

	console.log('>> not found');
	next();
    });

http.createServer(app).listen(SERVER_PORT);