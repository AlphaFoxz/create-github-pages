import * as esbuild from 'esbuild'

await esbuild.build({
  bundle: true,
  entryPoints: ['index.ts'],
  outfile: 'bin/create-nuxt-content-git-pages.cjs',
  format: 'cjs',
  platform: 'node',
  target: 'node16',
})
