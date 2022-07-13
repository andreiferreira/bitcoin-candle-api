import { app } from "./app";
import { config } from 'dotenv';
import { connectToMongoDB } from "./config/db";
import { connection } from "mongoose";
import CandleMessageChannel from "./messages/CandleMessageChannel";

const createServer = async() => {
    config();

    await connectToMongoDB()
    
    const PORT = process.env.PORT
    const server = app.listen(PORT, () => { console.log(`App running on port ${PORT}`) })

    const candlesMsgChannel = new CandleMessageChannel(server);
    candlesMsgChannel.consumeMessages()

    process.on('SIGINT', async() => {
        await connection.close();
        server.close();
        console.log(`App server and connection to MongoDB closed`)
    })
}

createServer()


