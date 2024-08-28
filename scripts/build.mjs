import * as esbuild from 'esbuild'

await esbuild.build({
  bundle: true,
  entryPoints: ['index.ts'],
  drop: ['debugger'],
  minify: true,
  outfile: 'bin/create-nuxt-content-git-pages.cjs',
  format: 'cjs',
  platform: 'node',
  target: 'node16',
})
