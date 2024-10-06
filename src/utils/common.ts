import lang from '../lang'

const t = lang.action.t

export function onCancel() {
  throw Error(t('error.userCancel'))
}

export function onError(str: string) {
  throw new Error(str)
}
