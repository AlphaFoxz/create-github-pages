import type { LangName, LangContent } from './lang/define'

export {}

declare global {
  function t(key: keyof LangContent, defaultValue?: string): string
  function t(key: keyof LangContent, attr: Record<string, string | number>, defaultValue?: string): string
  function t(key: keyof LangContent, attr1?: string | Record<string, string | number>, attr2?: string): string

  function updateLang(lang: LangName): void
}
