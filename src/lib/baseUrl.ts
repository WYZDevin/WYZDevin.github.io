import {
  ENV,
  PROD_URL,
  DEV_URL
} from 'astro:env/client'

const url =
  ENV === 'prod'
    ? PROD_URL
    : DEV_URL
const BASE_URL = url ? `${url}` : 'http://localhost:4321'
// console.log('BASE_URL', BASE_URL)
export { BASE_URL }
