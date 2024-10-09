export type OperationType = 'create' | 'update'
export type CreateArgs = {
  template?: TemplateType
  folderName?: string
  prefix?: string
  branchName?: string
}
export type UpdateArgs = {
  template?: TemplateType
  prefix?: string
  folderName?: string
  branchName?: string
}

export type TemplateType = 'nuxt_content'
export type RepoType = 'git' | 'gitee'
export type BranchType = 'base'

export interface TemplateInfo {
  _template: TemplateType
  name: string
  version: string
}
