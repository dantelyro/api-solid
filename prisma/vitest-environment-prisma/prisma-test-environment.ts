import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import { type Environment } from 'vitest'
import { PrismaClient } from '@prisma/client'
import { execSync } from 'node:child_process'

const prisma = new PrismaClient()

function generateDataBaseUrl (schema: string): string {
  if (!process.env.DATABASE_URL) {
    throw new Error('please provide a database environment variable')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

const environment: Environment = {
  name: 'prisma',
  transformMode: 'ssr',

  async setup () {
    const schema = randomUUID()
    const databaseUrl = generateDataBaseUrl(schema)

    process.env.DATABASE_URL = databaseUrl

    execSync('npx prisma migrate deploy')

    return {
      async teardown () {
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
        await prisma.$disconnect()
      }
    }
  }
}

export default environment
