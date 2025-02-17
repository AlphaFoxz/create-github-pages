import { createSingletonAgg } from 'vue-fn/domain-server'
import { ref } from '@vue/reactivity'
import { LangContent, LangName } from './define'
import enContent from './en'
import zhContent from './zh'

const agg = createSingletonAgg(() => {
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
  return {
    states: {
      currentLang,
    },
    commands: {
      updateLang,
      t,
    },
  }
})

export function useI18n() {
  return agg.api
}
