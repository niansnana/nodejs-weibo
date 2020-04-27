/**
 * @description 用户接口
 * @author niansnana
 */
const { ErrorModel } = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/ErrorModel')
/**
 * 生成 json Schema 的中间件
 * @param {funtion} validateFn userValidate 验证函数
 */
function genValidator (validateFn) {
  // 定义中间件函数
  async function validator (ctx, next) {
    // 校验
    const data = ctx.request.body
    const error = validateFn(data)
    if (error) {
      // 验证失败
      ctx.body = new ErrorModel(jsonSchemaFileInfo)
      return
    }
    // 验证成功，执行下一步
    await next()
  }
  return validator
}

module.exports = {
  genValidator
}
