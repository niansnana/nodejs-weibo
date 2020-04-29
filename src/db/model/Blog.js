/**
 * @description 创建文章表
 * @author niansnana
 */
const seq = require('../seq')
const { INTEGER, STRING, TEXT } = require('../types')

const Blog = seq.define('blog', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户ID'
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: '内容'
  },
  image: {
    type: STRING,
    comment: '图片'
  }
})

module.exports = Blog
