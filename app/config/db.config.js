require('dotenv').config()
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB = process.env.DB
const DIALECT = process.env.DIALECT
const POOL = process.env.POOL
module.exports = {
    HOST: DB_HOST,
    USER: DB_USER,
    PASSWORD: DB_PASS,
    DB: DB,
    dialect: DIALECT,
    pool: {
      max: POOL.max,
      min: POOL.min,
      acquire: POOL.acquire,
      idle: POOL.idle
    }
  };