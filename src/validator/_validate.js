/**
 * @description json Schema 校验
 * @author niansnana
 */
const Ajv = require('ajv')
const ajv = new Ajv({
  // allErrors: true // 运行输出全部错误（比较慢）
})

/**
 * 编写校验函数
 * @param {String} schema 校验规则
 * @param {String} data 被校验的数据
 */
function validate (schema, data = {}) {
  const valid = ajv.validate(schema, data)
  if (!valid) {
    return ajv.errors[0]
  }
}

module.exports = validate
