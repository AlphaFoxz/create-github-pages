export type LangType = 'zh' | 'en'
export type DictType = {
  'question.template': string
  'question.folderName': string
  'question.prefix': string
  'question.branchName': string
  'signal.scriptStarted': string
  'signal.exitWithError': string
  'signal.exitWithSuccess': string
  'error.duplicateFolder{name}': string
  'error.subtitle': string
  'error.userCancel': string
  'error.downloadTemplate': string
  'warn.retryDownloadTemplate': string
}
