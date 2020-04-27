const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    isMe: true,
    blogList: [
      {
        id: 1,
        title: 'aaa'
      },
      {
        id: 2,
        title: 'bbb'
      },
      {
        id: 3,
        title: 'ccc'
      }
    ]
  })
})

router.get('/json', async (ctx, next) => {
  // const session = ctx.session
  // if (session.vierNum === null) {
  //   session.vierNum = 0
  // }
  // session.vierNum++
  ctx.body = {
    title: 'koa2 json',
    // vierNum: session.vierNum
  }
})

router.get('/profile/:userName', async (ctx, next) => {
  const { userName } = ctx.params
  ctx.body = {
    title: 'this is profile',
    userName
  }
})

router.get('/loadMore/:userName/:pageIndex', async (ctx, next) => {
  const { userName, pageIndex } = ctx.params
  ctx.body = {
    title: 'this is load page',
    userName,
    pageIndex
  }
})

module.exports = router
