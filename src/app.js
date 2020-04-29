const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const koaStatic = require('koa-static')
const path = require('path')

const { REDIS_CONF } = require('./conf/db')
const { isProd } = require('./utils/env')
const { SESSION_SECRET_KEY } = require('./conf/secretKeys')

// 页面路由
const userViewRouter = require('./routes/view/user')
const blogViewRouter = require('./routes/view/blog')
// 接口路由
const utilsAPIRouter = require('./routes/api/utils')
const userAPIRouter = require('./routes/api/user')
const errorViewRouter = require('./routes/view/error')

// error handler
let onerrorConf = {}
if (isProd) {
  onerrorConf = {
    redirect: '/error'
  }
}
onerror(app, onerrorConf)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// 配置 redis-session
app.keys = [SESSION_SECRET_KEY] // 对session进行加密
app.use(session({
  key: 'weibo.sid', // session name 默认是 koa.sid
  prefix: 'weibo:sess:', // redis-key 的前缀，默认是 koa:sess:
  cookie: {
    path: '/', // 设置所有路径都有cookie
    httpOnly: true, //只允许服务端修改
    maxAge: 24 * 60 * 60 * 1000 // 过期时间（设置一天）
  },
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// 界面路由
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
// 接口路由
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods())
// 其他路由
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) // 注意 404 路由放在最下面

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
