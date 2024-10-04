import * as esbuild from 'esbuild'

await esbuild.build({
  bundle: true,
  entryPoints: ['src/index.ts'],
  drop: ['debugger'],
  minify: true,
  outfile: 'bin/create-github-pages.cjs',
  format: 'cjs',
  platform: 'node',
  target: 'node16',
})
