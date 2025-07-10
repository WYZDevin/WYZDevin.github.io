const url =
  import.meta.env.PUBLIC_ENV === 'prod'
    ? import.meta.env.PUBLIC_PROD_URL
    : import.meta.env.PUBLIC_DEV_URL
const BASE_URL = url ? `${url}` : 'http://localhost:4321'
// console.log('BASE_URL', BASE_URL)
export { BASE_URL }
