export type LangName = 'zh' | 'en'
export type LangContent = {
  'signal.scriptStarted': string
  'signal.exitWithError': string
  'signal.exitWithSuccess': string
  'args.operationType': string
  'args.operationType.create': string
  'args.operationType.update': string
  'args.template': string
  'args.folderName': string
  'args.prefix': string
  'args.branchName': string
  'info.templateIsAlreadyUpdated': string
  'error.duplicateFolder{name}': string
  'error.invalidFolder{name}': string
  'error.subtitle': string
  'error.userCancel': string
  'error.downloadTemplate': string
  'error.networkError': string
  'error.networkError{info}': string
  'warn.retryDownloadTemplate': string
}
