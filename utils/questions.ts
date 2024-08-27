import prompts from 'prompts'
import lang from '../lang'

const t = lang.action.t
const updateLang = lang.action.updateLang

let result: {
  folderName?: string
  prefix?: string
} = {}

export async function getCustomAnswers(): Promise<typeof result> {
  const defaultProjectName = '.git-pages'
  const { lang } = await prompts([
    {
      name: 'lang',
      type: 'select',
      message: 'Choose The language during this creation process',
      choices: [
        { title: 'English', value: 'en' },
        { title: '中文', value: 'zh' },
      ],
    },
  ])
  console.warn('lang: ' + lang)
  if (!lang) {
    throw Error(t('console.error.userCancel'))
  }
  updateLang(lang)

  result = await prompts([
    {
      name: 'folderName',
      type: 'text',
      message: t('question.message.folderName'),
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
      message: t('question.message.prefix'),
      initial: '',
      onState: (state) => {
        if (!state.value || /(\s|\/|\\)+/.test(state.value)) {
          return ''
        }
        return state.value
      },
    },
  ])
  if (result.prefix === undefined || result.folderName === undefined) {
    throw Error(t('console.error.userCancel'))
  }
  return result
}
