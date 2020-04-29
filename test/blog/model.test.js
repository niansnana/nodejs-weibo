/**
 * @description 微博模型-单元测试
 * @author niansnana
 */
const { Blog } = require('../../src/db/model/index')

test('Blog模型各个属性，应符合预期', () => {
  const blog = Blog.build({
    userId: 1,
    content: 'testContent',
    image: '/xxx.png'
  })
  expect(blog.userId).toBe(1)
  expect(blog.content).toBe('testContent')
  expect(blog.image).toBe('/xxx.png')
})
