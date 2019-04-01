// 常用参数配置
var config = {
   port: '8000',
   address: function () {
      return 'http://192.168.1.103:'+ this.port;
   } 
};
module.exports = config