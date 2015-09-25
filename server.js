var browserify = require('browserify');
var react = require('react');
var path = require('path');
var express = require('express');
var app = express();
var cons = require('consolidate');
app.engine('html', cons.lodash);
app.set('view engine', 'html');
app.set('views', '.');

var basepath = path.join(__dirname);


/************************************************************
 *
 * Express routes for:
 *   - app.js
 *   - style.css
 *   - index.html
 *
 *   Sample endpoints to demo async data fetching:
 *     - POST /landing
 *     - POST /home
 *
 ************************************************************/

// Serve application file depending on environment
app.get('/app.js', function(req, res) {
  if (process.env.PRODUCTION) {
    res.sendFile(__dirname + '/build/app.js');
  } else {
    res.redirect('//localhost:9090/build/app.js');
  }
});

// Serve aggregate stylesheet depending on environment
app.get('/style.css', function(req, res) {
  if (process.env.PRODUCTION) {
    res.sendFile(__dirname + '/build/style.css');
  } else {
    res.redirect('//localhost:9090/build/style.css');
  }
});





var glob = require('glob');

function getAllAppComponentSandboxNames(callback) {
  glob("src/components/**/sandbox.jsx", function (er, files) {
    callback(files.map(function (path) {
      return path.split('/')[2];
    }));
  });
}

function toPath() {
  var args = Array.prototype.slice.call(arguments);

  return args.join('/');
}

app.get('/components/:component.js', function(req, res, next) {
  var filename = path.join(basepath, './src/components', req.params.component, req.params.component + '.jsx');
  var sandbox = path.join(basepath, './src/components', req.params.component, 'sandbox.jsx');
  var b = browserify();

  b.require('react', {expose: 'react'});
  b.require(filename, {expose: req.params.component});
  b.require(sandbox, {expose: 'sandbox'});

  res.setHeader('content-type', 'text/javascript');

  // catch file system errors, such as test.js being unreadable
  b.on('error', function(error) {
    console.error('browserify error', error);

    res.send('console.error(\'' + errorMessage + '\');');
  });

  b.bundle()
    .on('error', function(error) {
      console.log("b.bundle() error", error);

      var errorMessage = [error.name, ': "', error.description, '" in ', error.filename, ' at line number ', error.lineNumber].join('');
      // due to Chrome not displaying response data in non 200 states need to expose the error message via a console.error
      res.send('console.error(\'' + errorMessage + '\');');
    })
    .pipe(res);
});

app.get('/components/:component', function(req, res) {
  var name = req.params.component;
  var symbol = name;
  var uri = toPath('/components/' + symbol + '.js');

  res.render('component', {
    component_uri: uri,
    component_name: name
  });
});

app.get('/components', function(req, res) {
  getAllAppComponentSandboxNames(function(componentNames) {
    res.render('components', {
      components: componentNames
    });
  });
});









// Serve index page
app.get('*', function(req, res) {
  res.sendFile(__dirname + '/build/index.html');
});

app.post('/landing', function(req, res) {
  res.json({
    title: "Landing Page"
  });
});

app.post('/home', function(req, res) {
  res.json({
    title: "Home Page"
  });
});

/*************************************************************
 *
 * Webpack Dev Server
 *
 * See: http://webpack.github.io/docs/webpack-dev-server.html
 *
 *************************************************************/

if (!process.env.PRODUCTION) {
  var webpack = require('webpack');
  var WebpackDevServer = require('webpack-dev-server');
  var config = require('./webpack.local.config');

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    noInfo: true,
    historyApiFallback: true
  }).listen(9090, 'localhost', function (err, result) {
    if (err) {
      console.log(err);
    }
  });
}


/******************
 *
 * Express server
 *
 *****************/

var port = process.env.PORT || 8080;
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Essential React listening at http://%s:%s', host, port);
});
