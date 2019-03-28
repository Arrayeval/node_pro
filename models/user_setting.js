 
const userConfig = require('../config/userConfig')
 
const UserSetting = {
  login (obj) {
    return new Promise ((resolve, reject) => {
      var username = obj.username;
      var password = obj.password;
      if( userConfig.username.includes(username) && password === userConfig.password){
       resolve({username}); //设置session，表示用户处在的登录状态
      }else{
       reject({msg: 'password or username error'});//用户名或密码不正确
      }
    })
  },
  loginOut (req) {
    return new Promise ((resolve) => {
      req.session.destroy()
      resolve()
    })
  }
}

module.exports = UserSetting