/**
 * 
 * @description 存储配置
 * @author niansnana
 */
const { isProd } = require('../utils/env')

let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}

let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '3306',
  database: 'node_weibo_db'
}

// 先模拟一个线上配置
if (isProd) {
  REDIS_CONF = {
    // 线上 redis 配置
    port: 6379,
    host: '127.0.0.1'
  }
  // 线上 mysql 配置
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'node_weibo_db'
  }
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}
