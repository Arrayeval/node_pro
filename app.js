var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var envConfig = require('./config/envConfig')

// 引入路由文件
var indexRouter = require('./routes/index');
var tabRouter = require('./routes/tabs') 
var articleRouter = require('./routes/article') 
var uploadRouter = require('./routes/upload_file') 

var app = express();

// cors设置[跨域问题] https://github.com/expressjs/cors#readme
var cors  = require('cors')
var corsConfig = require('./config/corsConfig')
app.options('*',cors(corsConfig))
app.all('*', cors(corsConfig));
// app.locals.dataDocuemnt = 'www'
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
 
// 路由配置
app.use('/', indexRouter);
app.use('/tabs', tabRouter);
app.use('/article', articleRouter);
app.use('/upload', uploadRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.set("port",envConfig.port)
app.listen(app.get("port"), function() {
  console.log('listening on port:', app.get("port"));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500).send({code:-1,msg :err.message || 'system.error'});
  res.render('error');
  res.locals.aaaa="22222"
});

module.exports = app;
