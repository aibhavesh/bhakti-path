import { spawnSync } from 'node:child_process'

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const npmExecPath = process.env.npm_execpath

function run(args) {
  const command = npmExecPath ? process.execPath : npm
  const commandArgs = npmExecPath ? [npmExecPath, ...args] : args
  const result = spawnSync(command, commandArgs, {
    stdio: 'inherit',
    env: process.env,
  })

  if (result.status !== 0) {
    process.exit(result.status || 1)
  }
}

const hasRemoteDatabase = Boolean(
  process.env.DATABASE_URL && process.env.DATABASE_URL !== 'file:./bhaktipath.db',
)

if (process.env.RUN_MIGRATIONS === 'true' && hasRemoteDatabase) {
  console.log('Netlify: applying Payload database migrations…')
  run(['run', 'db:migrate'])
} else {
  console.log('Netlify: skipping database migration for this deploy context.')
}

console.log('Netlify: building Next.js application…')
run(['run', 'build'])
