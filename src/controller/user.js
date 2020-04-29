/**
 * 
 * @description user controller
 * @author niansnana
 */
const { getUserInfo, createUser, deleteUser, updateUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
  deleteUserFailInfo,
  changeInfoFailInfo,
  changePasswordFailInfo
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
/**
 * 修改用户信息
 * @param {Function} ctx xtx
 * @param {String} nickName 昵称
 * @param {String} city 城市
 * @param {String} picture 头像
 */
async function changeInfo (ctx, { nickName, city, picture }) {
  const { userName } = ctx.session.userInfo
  if (!nickName) {
    nickName = userName
  }
  const result = await updateUser(
    {
      newNickName: nickName,
      newCity: city,
      newPicture: picture
    },
    { userName })
  if (result) {
    Object.assign(ctx.session.userInfo, {
      nickName,
      city,
      picture
    })
    return new SuccessModel()
  }
  return new ErrorModel(changeInfoFailInfo)
}

/**
 * 修改用户密码
 * @param {String} userName 用户名
 * @param {String} password 密码
 * @param {String} newPassword 新密码
 */
async function changePassword (userName, password, newPassword) {
  const result = await updateUser(
    {
      newPassword: doCrypto(newPassword)
    },
    {
      userName,
      password: doCrypto(password)
    }
  )
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(changePasswordFailInfo)
}
/**
 * 
 * @param {Function} ctx ctx
 */
async function logout (ctx) {
  delete ctx.session.userInfo
  return new SuccessModel()
}

module.exports = {
  isExist,
  register,
  login,
  deleteCurUser,
  changeInfo,
  changePassword,
  logout
}
