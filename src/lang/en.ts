import { LangContent } from './define'

const enDict: LangContent = {
  'signal.scriptStarted': '===== Script start =====',
  'signal.exitWithError': '===== Exit with error =====',
  'signal.exitWithSuccess': '===== Program execution succeeded =====',
  'args.operationType': 'Select a operation whitch you want to execute',
  'args.operationType.create': 'Create Github Pages',
  'args.operationType.update': 'Check and update the code template',
  'args.template': 'Select a template to render your markdown files',
  'args.folderName':
    'Input folder name, this will create a folder in the current directory to initialize the md project',
  'args.prefix': 'Input this project GitPages prefix (repository name), e.g.: /ProjectName',
  'args.branchName': 'Input branch name witch will trigger git deploy action',
  'info.templateIsAlreadyUpdated': 'The template is already updated to the latest version',
  'error.duplicateFolder{name}': 'Folder or file already exists: {name}',
  'error.invalidFolder{name}': 'Invalid folder: {name}',
  'error.validVersionNotDetected': 'Valid version not detected',
  'error.subtitle': 'ERROR: ',
  'error.userCancel': 'User canceled',
  'error.downloadTemplate': 'Download Failed, please check your network',
  'error.networkError': 'Network error',
  'error.networkError{info}': 'Network error: {info}',
  'warn.retryDownloadTemplate': 'Download template failed, try to download from gitee',
}

export default enDict
