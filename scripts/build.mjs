import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  drop: ['debugger'],
  outfile: 'bin/create-github-pages.cjs',
  sourcemap: true,
  minify: true,
  format: 'cjs',
  platform: 'node',
  target: 'node18',
  tsconfig: 'tsconfig.build.json',
})
