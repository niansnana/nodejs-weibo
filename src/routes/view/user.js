/**
 * @description 路由跳转：用户界面
 * @augments niansnana
 */
const router = require('koa-router')()

// 登录
router.get('/login', async (ctx, next) => {
  await ctx.render('login', {})
})
// 注册
router.get('/register', async (ctx, next) => {
  await ctx.render('register', {})
})

module.exports = router
