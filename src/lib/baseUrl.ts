import {
  PUBLIC_ENV,
  PUBLIC_PROD_URL,
  PUBLIC_DEV_URL
} from 'astro:env/client'

const url =
  PUBLIC_ENV === 'prod'
    ? PUBLIC_PROD_URL
    : PUBLIC_DEV_URL
const BASE_URL = url ? `${url}` : 'http://localhost:4321'
// console.log('BASE_URL', BASE_URL)
export { BASE_URL }
