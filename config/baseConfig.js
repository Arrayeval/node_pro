var config = {
  localConnect: {
    host: 'localhost',
    port: '3306',
    user: 'uroot',
    password: '123456',
    database: 'stu_el',
    acquireTimeout: 15000, // 连接超时时间
    connectionLimit: 200, // 最大连接数
  }
};
module.exports = config