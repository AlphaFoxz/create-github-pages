import { DictType } from './define'

const enDict: DictType = {
  'question.template': 'Select a template to render your markdown files',
  'question.folderName':
    'Input folder name, this will create a folder in the current directory to initialize the md project',
  'question.prefix': 'Input this project GitPages prefix (repository name), e.g.: /ProjectName',
  'question.branchName': 'Input branch name witch will trigger git deploy action',
  'signal.scriptStarted': '===== Script start =====',
  'signal.exitWithError': '===== Exit with error =====',
  'signal.exitWithSuccess': '===== Program execution succeeded =====',
  'error.duplicateFolder{name}': 'Folder or file already exists: {name}',
  'error.subtitle': 'ERROR: ',
  'error.userCancel': 'User canceled',
  'error.downloadTemplate': 'Download Failed, please check your network',
  'warn.retryDownloadTemplate': 'Download template failed, try to download from gitee',
}

export default enDict
