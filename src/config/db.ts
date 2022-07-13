import * as mongoose from 'mongoose'
import {config} from 'dotenv'

config()
export const connectToMongoDB = async () => {
    await mongoose.connect(process.env.MONGODB_CONNECTION_URL!, {
    })

    return mongoose
}