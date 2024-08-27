import { DictType } from './define'

const zhDict: DictType = {
  'question.message.folderName': '请输入文件夹名称，这将在当前目录创建一个文件夹，用于初始化文档项目',
  'question.message.prefix': '请输入此项目的GitPages前缀（仓库名），如：/ProjectName',
  'console.info.scriptStart': '===== 脚本开始执行 =====',
  'console.error.exit': '===== 异常退出 =====',
  'console.error.duplicateFolder': '同名文件夹或文件已存在：{name}',
  'console.error.subtitle': '错误: ',
  'console.error.userCancel': '用户终止了脚本执行',
  'console.error.retryDownloadTemplate': '下载模板失败，尝试从gitee下载',
  'console.error.downloadTemplate': '下载模板失败，请检查您的网络',
  'console.success.complete': '===== 程序执行成功 =====',
}

export default zhDict
