import { DictType } from './define'

const zhDict: DictType = {
  'question.template': '请选择一个模板，用于渲染您的markdown文件',
  'question.folderName': '请输入文件夹名称，这将在当前目录创建一个文件夹，用于初始化文档项目',
  'question.prefix': '请输入此项目的GitPages前缀（仓库名），如：/ProjectName',
  'question.branchName': '请输入触发git部署的分支名称',
  'signal.scriptStarted': '===== 程序开始执行 =====',
  'signal.exitWithError': '===== 程序异常退出 =====',
  'signal.exitWithSuccess': '===== 程序执行成功 =====',
  'message.error.duplicateFolder': '同名文件夹或文件已存在：{name}',
  'message.error.subtitle': '错误: ',
  'message.error.userCancel': '用户终止了脚本执行',
  'message.error.retryDownloadTemplate': '下载模板失败，尝试从gitee下载',
  'message.error.downloadTemplate': '下载模板失败，请检查您的网络',
}

export default zhDict
