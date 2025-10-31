import { env } from '~/config/environment.js'
import mongoose from 'mongoose'

const MONGODB_URI = env.MONGODB_URI
const DATABASE_NAME = env.DATABASE_NAME

export const CONNECT_DB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
    dbName: DATABASE_NAME
  })
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    process.exit(1)  
  }

}
