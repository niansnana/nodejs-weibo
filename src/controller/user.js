/**
 * 
 * @description user controller
 * @author niansnana
 */
const { getUserInfo, createUser, deleteUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
  deleteUserFailInfo
} = require('../model/ErrorModel')
const doCrypto = require('../utils/cryp')
/**
 * 用户名是否存在
 * @param {String} userName 用户名
 */
async function isExist (userName) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 用户名存在
    return new SuccessModel(userInfo)
  } else {
    // 用户名不存在
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

/**
 * 注册用户
 * @param {String} userName 用户名
 * @param {String} password 密码
 * @param {Number} gender 性别 （1男 2女 3保密）
 */
async function register ({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 用户名存在
    return new ErrorModel(registerUserNameExistInfo)
  }
  // 调用 services
  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender
    })
    return new SuccessModel()
  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(registerFailInfo)
  }
}
/**
 * 登录接口
 * @param {Object} ctx koa2 cts
 * @param {String} userName 用户名
 * @param {String} password 密码
 */
async function login (ctx, userName, password) {
  // 获取用户信息
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if (!userInfo) {
    return new ErrorModel(loginFailInfo)
  }
  // 登录成功
  if (ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessModel()
}
/**
 * 删除当前用户
 * @param {String} userName 用户名
 */
async function deleteCurUser (userName) {
  const result = await deleteUser(userName)
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(deleteUserFailInfo)
}

module.exports = {
  isExist,
  register,
  login,
  deleteCurUser
}
