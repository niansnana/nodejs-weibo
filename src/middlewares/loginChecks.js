/**
 * @description 登录验证中间件
 * @author niansnana
 */

const { ErrorModel } = require('../model/ResModel')
const { loginCheckFailInfo } = require('../model/ErrorModel')
/**
 * API 登录验证
 * @param {Object} ctx ctx
 * @param {Function} next next
 */
async function loginCheck (ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    // 已登录
    await next()
    return
  }
  // 未登录
  return new ErrorModel(loginCheckFailInfo)
}
/**
 * 页面 登录验证
 * @param {Object} ctx ctx
 * @param {Function} next next
 */
async function loginRedirect (ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    // 已登录
    await next()
    return
  }
  // 未登录
  const curUrl = ctx.url
  ctx.redirect('/login?url=' + encodeURIComponent(curUrl)) // 作用：未登录则强制返回登录页，在登录成功后跳转到之前访问的页面
}

module.exports = {
  loginCheck,
  loginRedirect
}
