/**
 * @description 用户模型-单元测试
 * @author niansnana
 */
const { User } = require('../../src/db/model/index')

test('User 模型的各个属性，符合预期', () => {
  // build 会构成内存实例，不会提交到数据库
  const user = User.build({
    userName: 'nian',
    password: 'npass',
    nickName: '年',
    // gender: 1, // 因为有默认值，故注释
    picture: '/xxx.png',
    city: '安徽'
  })
  expect(user.userName).toBe('nian')
  expect(user.password).toBe('npass')
  expect(user.nickName).toBe('年')
  expect(user.gender).toBe(3)
  expect(user.picture).toBe('/xxx.png')
  expect(user.city).toBe('安徽')
})
