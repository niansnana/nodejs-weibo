/**
 * @description 微博页面路由
 * @author niansnana
 */
const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')

// 首页
router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {})
})

module.exports = router
