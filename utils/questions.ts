import prompts from 'prompts'

let result: {
  projectName?: string
  prefix?: string
} = {}

export async function getCustomAnswers(): Promise<typeof result> {
  const defaultProjectName = '.git-pages'
  result = await prompts([
    {
      name: 'projectName',
      type: 'text',
      message: 'insert the project name: ',
      initial: defaultProjectName,
      onState: (state) => {
        if (!state.value || /(\s|\/|\\)+/.test(state.value)) {
          return state.value
        }
        return defaultProjectName
      },
    },
    {
      name: 'prefix',
      type: 'text',
      message: 'insert the url prefix: ',
      initial: '',
      onState: (state) => {
        if (!state.value || /(\s|\/|\\)+/.test(state.value)) {
          return ''
        }
        return state.value
      },
    },
  ])
  return result
}
