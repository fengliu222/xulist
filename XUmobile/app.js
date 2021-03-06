
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , db = require('./db');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 80);
  //app.set('views', __dirname + '/views');
  // app.set('view engine', 'html');
  //app.set('view engine', 'html');

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
//  app.use(express.session({
//      secret:"jianfeng"
//  }))
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

//app.engine('html', require('ejs').__express);
app.configure('production', function(){
  app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
routes(app);
// db.init();