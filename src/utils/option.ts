import fs from 'node:fs'
import path from 'node:path'

export function optionProject(projectName: string, prefix: string, branchName: string) {
  if (prefix && !prefix.startsWith('/')) {
    prefix = '/' + prefix
  }
  const isWrappedWiki = checkIsWrappedWiki()
  const wikiRootPath = isWrappedWiki ? `./${projectName}` : '.'
  const repoRootPath = isWrappedWiki ? `.` : wikiRootPath
  const template = `# https://github.com/actions/deploy-pages#usage
# https://nuxt.com/deploy/github-pages
name: Deploy to GitHub Pages
on:
  workflow_dispatch:
  push:
    branches:
      - ${branchName}
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: corepack enable
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 8
      # Pick your own package manager and build script
      - run: cd ${wikiRootPath} && pnpm install
      # Setup environment variables
      # NUXT_APP_BASE_URL is your GitHub Repo Name.
      - run: cd ${wikiRootPath} && echo 'NUXT_APP_BASE_URL=${prefix}' > ./.env
      # Build project
      - run: cd ${wikiRootPath} && pnpm build
      - name: Upload artifact 🚀
        uses: actions/upload-pages-artifact@v3
        with:
          path: ${wikiRootPath}/.output/public

  # Deployment job
  deploy:
    # Add a dependency to the build job
    needs: build
    # Grant GITHUB_TOKEN the permissions required to make a Pages deployment
    permissions:
      pages: write # to deploy to Pages
      id-token: write # to verify the deployment originates from an appropriate source
    # Deploy to the github_pages environment
    environment:
      name: github_pages
      url: \${{ steps.deployment.outputs.page_url }}
    # Specify runner + deployment step
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`
  const actionDirPath = path.join(repoRootPath, '.github', 'workflows')
  fs.mkdirSync(actionDirPath, { recursive: true })
  const actionFilePath = path.join(actionDirPath, 'github-pages.yml')
  fs.writeFileSync(actionFilePath, template, { encoding: 'utf8', flush: true })
}

function checkIsWrappedWiki(): boolean {
  return fs.existsSync('./.git') || fs.existsSync('./package.json')
}
