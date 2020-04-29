/**
 * @description user API test
 * @author niansnana
 */
const server = require('../server')

// 编写测试用户信息
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
  userName,
  password,
  nickName: userName,
  gender: 1
}

// 存储 cookie （作用，绕过登录验证
let COOKIE = ''

// 注册
test('注册接口可用！', async () => {
  const res = await server.post('/api/user/register').send(testUser)
  expect(res.body.errno).toBe(0)
})

// 重复注册
test('重复注册应该失败！', async () => {
  const res = await server.post('/api/user/register').send(testUser)
  expect(res.body.errno).not.toBe(0)
})

// 查询用户是否存在
test('查询的用户名，应该存在', async () => {
  const res = await server.post('/api/user/isExist').send({ userName })
  expect(res.body.errno).toBe(0)
})

// json Schema 检测
test('json Schema 检测的非法格式，应该失败', async () => {
  const res = await server.post('/api/user/register').send({
    userName: '123', // 用户名应该字母开头
    password: '12', // 长度应大于等于三位
    // nickName: '',
    gender: 'main', // 非数字
  })
  expect(res.body.errno).not.toBe(0)
})

// 登录
test('登录应该成功', async () => {
  const res = await server.post('/api/user/login').send({
    userName,
    password
  })
  expect(res.body.errno).toBe(0)
  // 获取 cookie
  COOKIE = res.headers['set-cookie'].join(';')
})

// 修改基本信息
test('修改信息，应该成功！', async () => {
  const res = await server.patch('/api/user/changeInfo').send({
    nickName: '测试昵称',
    city: '测试城市',
    picture: '/xxx.png'
  }).set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

// 修改密码
test('修改密码，应该成功！', async () => {
  const res = await server.patch('/api/user/changePassword').send({
    password,
    newPassword: `p_${Date.now()}`
  }).set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

// 删除用户
test('删除用户，应该成功', async () => {
  const res = await server.post('/api/user/delete').set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

// 退出登录
test('退出登录，应该成功', async () => {
  const res = await server.post('/api/user/logout').set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

// 再次查询用户，判断是否删除
test('被删除用户，再次查询应该不存在', async () => {
  const res = await server.post('/api/user/isExist').send({ userName })
  expect(res.body.errno).not.toBe(0)
})
