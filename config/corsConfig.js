// https://github.com/expressjs/cors#readme 
const loginAdress = ['http://localhost:3001','http://192.168.1.103:3001','http://localhost:3000']
const corsConfig = {
  "origin": loginAdress,
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 200,
  "credentials": true
}

function SetCors (app) {
  var cors  = require('cors')
  app.options('*',cors(corsConfig))
  app.all('*', cors(corsConfig));
}
module.exports = SetCors