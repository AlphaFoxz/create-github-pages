import zhContent from './zh'
import enContent from './en'
import { LangName, LangContent } from './define'
import { ref } from '../utils/reactive'

const currentLang = ref<LangContent>(enContent)
function t(key: keyof LangContent, defaultValue?: string): string
function t(key: keyof LangContent, attr: Record<string, string | number>, defaultValue?: string): string
function t(key: keyof LangContent, attr1?: string | Record<string, string | number>, attr2?: string): string {
  let v = currentLang.value[key]
  if (!v) {
    if (typeof attr1 === 'string') {
      v = attr1
    } else if (typeof attr2 === 'string') {
      v = attr2
    }
  }
  if (!v) {
    return ''
  }
  if (typeof attr1 === 'object') {
    v = v.replace(/\{\s*([a-zA-z_]+)\s*\}/g, (_, name) => {
      return String(attr1[name])
    })
  }
  return v
}

function updateLang(lang: LangName) {
  if (lang === 'zh') {
    currentLang.value = zhContent
  } else if (lang === 'en') {
    currentLang.value = enContent
  }
}

;(globalThis as any).t = t
;(globalThis as any).updateLang = updateLang
