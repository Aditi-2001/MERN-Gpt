import mongoose from "mongoose";

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to Database")
    } catch (error) {
        console.log(error)
        throw new Error("Could not connect to Database")
    }
}

export const disconnectFromDatabase = async () => {
    try {
        await mongoose.disconnect()
        console.log("Disconnected from Database")
    } catch (error) {
        console.log(error)
        throw new Error("Could not disconnect from Database")
    }
}