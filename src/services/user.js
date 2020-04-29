/**
 * 
 * @description user services
 * @author niansnana
 */
const { User } = require('../db/model/index')
const { formatUser } = require('./_format')
/**
 * 
 * @param {String} userName 用户名
 * @param {String} password 密码
 */
async function getUserInfo (userName, password) {
  // 查询条件
  const whereOpt = {
    userName
  }
  if (password) {
    // 如果密码存在，则追加到 whereOpt
    Object.assign(whereOpt, { password })
  }
  // 查询
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'], // 需要查的字段（如果不写，则查询所有字段
    where: whereOpt
  })
  if (result == null) {
    return result
  }
  // 格式化
  const formartRes = formatUser(result.dataValues)
  return formartRes
}
/**
 * 注册用户
 * @param {String} userName 用户名
 * @param {String} password 密码
 * @param {Number} gender 性别 （1男 2女 3保密）
 * @param {String} nickName 昵称
 */
async function createUser ({ userName, password, gender = 3, nickName }) {
  const result = await User.create({
    userName,
    password,
    gender,
    nickName: nickName ? nickName : userName
  })
  return result.dataValues
}
/**
 * 删除用户
 * @param {String} userName 用户名
 */
async function deleteUser (userName) {
  const result = await User.destroy({
    where: {
      userName
    }
  })
  return result > 0 // true false
}
/**
 * 更新用户信息
 * @param {Object} param0 修改的内容 { newPasswod, newNickName, newCity, newPicture }
 * @param {Object} param1 条件 { userName, password }
 */
async function updateUser (
  { newPasswod, newNickName, newCity, newPicture },
  { userName, password }) {
  const updateData = {}
  if (newPasswod) {
    updateData.passwod = newPasswod
  }
  if (newNickName) {
    updateData.nickName = newNickName
  }
  if (newCity) {
    updateData.city = newCity
  }
  if (newPicture) {
    updateData.picture = newPicture
  }
  // 查询条件
  const whereOpt = {
    userName
  }
  if (password) {
    updateData.passwod = password
  }
  // 更新数据
  const result = await User.update(updateData, {
    where: whereOpt
  })
  return result[0] > 0
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser
}
