/**
 * @description blog-home controller
 * @author niansnana
 */
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorModel')
const { createBlog } = require('../services/blog')
/**
 * 创建微博
 * @param {Number} userId 用户ID
 * @param {String} content 内容
 * @param {String} image 图片路径
 */
async function create ({ userId, content, image }) {
  try {
    const result = createBlog({ userId, content, image })
    if (result) {
      return new SuccessModel(result)
    }
  } catch (ex) {
    console.error(ex.message, ex.stack) // 控制打印错误，之后线上会有日志处理
    return new ErrorModel(createBlogFailInfo)
  }
}

module.exports = {
  create
}
