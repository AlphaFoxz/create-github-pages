import lang from '../lang'

const t = lang.action.t

export function onCancel() {
  throw Error(t('message.error.userCancel'))
}
