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
  if (result === null) {
    return result
  }
  // 格式化
  const formartRes = formatUser(result.dataValues)
  return formartRes
}

module.exports = {
  getUserInfo
}
