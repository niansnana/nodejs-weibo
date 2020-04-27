/**
 * 
 * @description Sequelize 实例
 * @author niansnana
 */
const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')
const { host, user, password, database } = MYSQL_CONF

const conf = {
  host,
  dialect: 'mysql'
}

if (isTest) {
  // 测试环境，不打印sql语句
  conf.loggin = () => {}
}

if (isProd) {
  // 线上环境，使用连接池
  conf.pool = {
    max: 5, // 连接池中最大的连接数量
    min: 0, // 连接池中最大的连接数量
    idle: 10000 // 如果一个连接池 10s 内没有被使用，则释放
  }
}

const seq = new Sequelize(database, user, password, conf)

module.exports = seq
