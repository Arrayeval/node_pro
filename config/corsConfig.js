// https://github.com/expressjs/cors#readme 
const loginAdress = ['http://localhost:3000']
const corsConfig = {
  "origin": loginAdress,
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  "credentials": true
}
module.exports = corsConfig