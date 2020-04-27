/**
 * 
 * @description sequelize 同步数据库
 * @author niansnana
 */
const seq = require('./seq')

require('./model/index')

// 测试连接
seq.authenticate().then(() => {
  console.log('auth ok')
}).catch(() => {
  console.log('auth err')
})

// 执行同步（force: true 意味着每次建表都是删除所有表重新建）
seq.sync({ force: true }).then(() => {
  console.log('sync ok')
  process.exit()
})
