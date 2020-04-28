/**
 * @description utils controller
 * @augments niansnana
 */
const path = require('path')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { uploadFileSizeFailInfo } = require('../model/ErrorModel')
const fse = require('fs-extra')

// 定义转移目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')
// 限制文件最大为 1M
const MAX_SIZE = 1024 * 1024 * 1024

// 判断是否创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
  if (!exist) {
    fse.ensureDir(DIST_FOLDER_PATH)
  }
})

/**
 * 上传文件
 * @param {String} name 名称
 * @param {String} type 类型
 * @param {String} size 体积
 * @param {String} filePath 路径
 */
async function saveFile ({ name, type, size, filePath }) {
  if (size > MAX_SIZE) {
    // 同时删除过大文件
    await fse.remove(filePath)
    return new ErrorModel(uploadFileSizeFailInfo)
  }
  // 移动文件
  const fileName = Date.now() + '_' + name // 防止重名
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName)
  // 移动开始（初始位置，目标位置）
  await fse.move(filePath, distFilePath)
  return new SuccessModel({
    url: '/' + fileName
  })
}

module.exports = {
  saveFile
}
