'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter

var fs = require('fs'),
    config = require('meanio').loadConfig(),
    mkdirOrig = fs.mkdir,
    compression = require('compression'),
    bodyParser = require('body-parser'),

    encoding = 'utf8',
    storeDir = config.root + '/files/data/',
    osSep = '/';

if (!fs.existsSync(storeDir)){

  console.log('could not find store directory at %s', storeDir);

  process.exit(1);
}




module.exports = function(Dashboard, app, auth, database) {

  app.use(compression());
  app.use(bodyParser.json());

  app.get('/dashboard/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/dashboard/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/dashboard/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/dashboard/example/render', function(req, res, next) {
    Dashboard.render('index', {
      package: 'dashboard'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });


  app.get('/v1/store', function(req, res, next){
  fs.readdir(storeDir, function(err, files){
    if (err) {
      return next(err);
    }
    var boards = [];
    files.forEach(function(file){
      var json = JSON.parse(fs.readFileSync(storeDir + file, encoding));
      boards.push({
        id: file.replace('.json', ''),
        title: json.title
      });
    });
    // send response
    res.json({
      dashboards: boards
    });
  });
});

app.get('/v1/store/:id', function(req, res, next){
  fs.readFile(storeDir + req.params.id + '.json', encoding, function(err, data){
    if (err) {
      return next(err);
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(data);
  });
});

app.post('/v1/store/:id', function(req, res, next){
  fs.writeFile(
    storeDir + req.params.id + '.json',
    JSON.stringify(req.body, undefined, 2),
    function(err){
      if (err) {
        return next(err);
      }
      res.status(204).end();
    }
  );
});

app.delete('/v1/store/:id', function(req, res, next){
  fs.unlink(storeDir + req.params.id + '.json', function(err){
    if (err) {
      return next(err);
    }
    res.status(204).end();
  });
});

app.use(function(err, req, res, next) {
  if (err.errno === 34){
    console.log('could not find file for url %s', req.url);
    res.status(404).end();
  } else {
    console.log('unknown error on url %s: ', req.url, err);
    res.status(500).end();
  }
});


};
