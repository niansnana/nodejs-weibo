/**
 * 
 * @description 链接 redis 的方法 get set
 * @author niansnana
 */
const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
  console.error('redis error：', err)
})

/**
 * 
 * set 方法 time
 * @param {String} key 键
 * @param {String} val 值
 * @param {number} timeout（保质期，单位秒，一小时后就过期）
 */
function set (key, val, timeout = 60 * 60) {
  if (val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val)
  redisClient.expire(key, timeout)
}

/**
 * get 方法
 * @param {String} key 键
 */
function get (key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val === null) {
        resolve(null)
        return
      }
      try {
        resolve(
          JSON.parse(val)
        )
      } catch (ex) {
        resolve(val)
      }
    })
  })
  return promise
}


module.exports = {
  set,
  get
}
