/**
 * @description 微博模型-单元测试
 * @author niansnana
 */
const server = require('../server')
const { COOKIE } = require('../testUserInfo')
let BLOG_ID = ''
// 创建微博
test('创建一条微博，应该成功', async () => {
  const content = '单元测试自动创建的微博_' + Date.now()
  const image = '/xxx.png'
  // 开始测试
  const res = await server.post('/api/blog/create').send({
    content,
    image
  }).set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
  expect(res.body.data.content).toBe(content)
  expect(res.body.data.image).toBe(image)
  // 记录微博ID
  BLOG_ID = res.body.data.id
})
