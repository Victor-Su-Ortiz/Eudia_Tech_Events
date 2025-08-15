#!/usr/bin/env tsx

/**
 * Pre-deployment checklist for Vercel
 * Run: pnpm tsx scripts/pre-deploy-check.ts
 */

import { existsSync, readFileSync } from 'fs'
import { join } from 'path'

const rootDir = process.cwd()

interface CheckResult {
  name: string
  pass: boolean
  message: string
}

const checks: CheckResult[] = []

// Check 1: Verify package.json has correct scripts
const packageJson = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf8'))
checks.push({
  name: 'Build script exists',
  pass: !!packageJson.scripts?.build,
  message: packageJson.scripts?.build ? '✓ Build script found' : '✗ Missing build script',
})

// Check 2: Verify pnpm-lock.yaml exists
const pnpmLockExists = existsSync(join(rootDir, 'pnpm-lock.yaml'))
checks.push({
  name: 'pnpm-lock.yaml exists',
  pass: pnpmLockExists,
  message: pnpmLockExists ? '✓ Lock file present' : '✗ Missing pnpm-lock.yaml',
})

// Check 3: Verify vercel.json exists
const vercelJsonExists = existsSync(join(rootDir, 'vercel.json'))
checks.push({
  name: 'vercel.json exists',
  pass: vercelJsonExists,
  message: vercelJsonExists ? '✓ Vercel config found' : '✗ Missing vercel.json',
})

// Check 4: Verify Next.js config exists
const nextConfigExists = existsSync(join(rootDir, 'next.config.mjs'))
checks.push({
  name: 'next.config.mjs exists',
  pass: nextConfigExists,
  message: nextConfigExists ? '✓ Next.js config found' : '✗ Missing next.config.mjs',
})

// Check 5: Check Node version compatibility
const nvmrcExists = existsSync(join(rootDir, '.nvmrc'))
if (nvmrcExists) {
  const nodeVersion = readFileSync(join(rootDir, '.nvmrc'), 'utf8').trim()
  checks.push({
    name: 'Node version specified',
    pass: true,
    message: `✓ Node ${nodeVersion} specified`,
  })
}

// Check 6: Verify data directory exists
const dataExists = existsSync(join(rootDir, 'data', 'events.json'))
checks.push({
  name: 'Events data exists',
  pass: dataExists,
  message: dataExists ? '✓ Events data found' : '✗ Missing data/events.json',
})

// Check 7: TypeScript configuration
const tsconfigExists = existsSync(join(rootDir, 'tsconfig.json'))
checks.push({
  name: 'TypeScript config exists',
  pass: tsconfigExists,
  message: tsconfigExists ? '✓ TypeScript configured' : '✗ Missing tsconfig.json',
})

// Check 8: Tailwind configuration
const tailwindExists = existsSync(join(rootDir, 'tailwind.config.ts'))
checks.push({
  name: 'Tailwind config exists',
  pass: tailwindExists,
  message: tailwindExists ? '✓ Tailwind configured' : '✗ Missing tailwind.config.ts',
})

// Results
console.log('\n🚀 Vercel Deployment Pre-Check\n')
console.log('=' .repeat(40))

let allPassed = true
checks.forEach((check) => {
  console.log(`${check.message}`)
  if (!check.pass) allPassed = false
})

console.log('=' .repeat(40))

if (allPassed) {
  console.log('\n✅ All checks passed! Ready for Vercel deployment.\n')
  console.log('Deploy with: vercel --prod')
  console.log('Or push to main branch for automatic deployment\n')
  process.exit(0)
} else {
  console.log('\n⚠️  Some checks failed. Please fix issues before deploying.\n')
  process.exit(1)
}
