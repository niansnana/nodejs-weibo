/**
 * @description 数据表的入口文件
 * @author niansnana
 */
const User = require('./User')
const Blog = require('./Blog')

// 创建外键
/**
 * 查出微博顺便查出用户 hasMany则是查用户顺便查微博
 * 如果 belongsTo 不写第二个参数，则会自动创建 userId
 * 但！！！！！建表的时候不要建 userId 的字段了
 */
Blog.belongsTo(User, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  Blog
}
