import mongoose from "mongoose";
import config from "./config.js";

const dbConnect = async () => {
    await mongoose.connect(config.MONGO_URI)
    console.log("db is connected")
}

export default dbConnect