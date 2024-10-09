import { LangContent } from './define'

const zhDict: LangContent = {
  'signal.scriptStarted': '===== 程序开始执行 =====',
  'signal.exitWithError': '===== 程序异常退出 =====',
  'signal.exitWithSuccess': '===== 程序执行成功 =====',
  'args.operationType': '请选择一个本次要执行的操作类型',
  'args.operationType.create': '创建Github Pages',
  'args.operationType.update': '检查并更新代码模板',
  'args.template': '请选择一个模板，用于渲染您的markdown文件',
  'args.folderName': '请输入文件夹名称，这将在当前目录创建一个文件夹，用于初始化文档项目',
  'args.prefix': '请输入此项目的GitPages前缀（仓库名），如：/ProjectName',
  'args.branchName': '请输入触发git部署的分支名称',
  'info.templateIsAlreadyUpdated': '模板已经是最新版本的了',
  'error.duplicateFolder{name}': '同名文件夹或文件已存在：{name}',
  'error.invalidFolder{name}': '无效的文件夹：{name}',
  'error.validVersionNotDetected': '未检测到有效版本',
  'error.subtitle': '错误: ',
  'error.userCancel': '用户终止了脚本执行',
  'error.downloadTemplate': '下载模板失败，请检查您的网络',
  'error.networkError': '网络错误',
  'error.networkError{info}': '网络错误：{info}',
  'warn.retryDownloadTemplate': '下载模板失败，尝试从gitee下载',
}

export default zhDict
