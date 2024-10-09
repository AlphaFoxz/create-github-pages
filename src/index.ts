import './lang'
import { useArgs } from './stores/args'
import { isNever, onCancel } from './utils/common'
import createProcess from './process-create'
import updateProcess from './process-update'

init().catch((e: Error) => {
  console.error(e.message)
  console.error(t('signal.exitWithError'))
})

process.on('SIGINT', onCancel)

async function init(): Promise<boolean> {
  console.info(t('signal.scriptStarted'))

  const argsStore = useArgs()
  await argsStore.action.init()
  if (argsStore.state.currerntOperation.value === 'create') {
    return await createProcess()
  } else if (argsStore.state.currerntOperation.value === 'update') {
    return await updateProcess()
  } else {
    isNever(argsStore.state.currerntOperation.value)
  }
  console.info(t('signal.exitWithSuccess'))
}
