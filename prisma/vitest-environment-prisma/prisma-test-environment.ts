import { type Environment } from 'vitest'

const environment: Environment = {
  name: 'Prisma',
  transformMode: 'ssr',
  async setup () {
    console.log('Setup')

    return {
      async teardown () {
        console.log('Teardown')
      }
    }
  }
}

export default environment
