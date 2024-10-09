import fs from 'node:fs'
import { onError } from './utils/common'
import { useArgs } from './stores/args'
import { download } from './utils/download'
import { optionProject } from './utils/option'

const argsStore = useArgs()

export default async function (): Promise<boolean> {
  await argsStore.action.init()
  const { folderName, template, prefix, branchName } = argsStore.state.createArgs.value

  if (fs.existsSync(folderName)) {
    onError(t('error.duplicateFolder{name}', { name: folderName }))
    return false
  }
  await download(template, `./${folderName}`)
  optionProject(folderName, prefix, branchName)

  return true
}
