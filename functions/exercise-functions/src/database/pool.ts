import { Pool } from 'pg'

export const pool = new Pool({
  connectionTimeoutMillis: 60 * 1000,
  idleTimeoutMillis: 20 * 1000,
})
