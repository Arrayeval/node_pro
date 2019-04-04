
var routerConfig = {
  // indexRouter : require('./index'),
  tabRouter: require('./tabs'),
  userRouter: require('./users'),
  articleRouter: require('./article'),
  uploadRouter: require('./upload_file'),
  getOuterDataRouter: require('./get_outer_data')
}
 
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   // res.render('index', { title: 'Express'});
//   console.log('router index /')
// });

 function SetRouter (app) {
    app.use('/tabs', routerConfig.tabRouter);
    app.use('/article', routerConfig.articleRouter);
    app.use('/upload', routerConfig.uploadRouter);
    app.use('/getouterdata', routerConfig.getOuterDataRouter);
    app.use('/user', routerConfig.userRouter);
 }

module.exports = SetRouter;
