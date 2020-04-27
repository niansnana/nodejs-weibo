/**
 * @description 错误页 404
 * @augments niansnana
 */
const router = require('koa-router')()

router.get('/error', async (ctx, next) => {
  await ctx.render('error', {
    message: 'error',
    error: {
      status: 400,
      stack: 'ss'
    }
  })
})

router.get('*', async (ctx, next) => {
  await ctx.render('404')
})

module.exports = router
