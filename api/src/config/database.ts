import mongoose, { ConnectOptions } from "mongoose";
import { logcatch } from "../utils/logger";
import config from "./env";

const database = async () => {
    try {
        const mongooseOptions: ConnectOptions = {
            connectTimeoutMS: 1000
        }
        mongoose.set('strictQuery', false);
        await mongoose.connect(config.mongo_uri, mongooseOptions);
    } catch (error) {
        logcatch(error, "err")
    }
}; 

export default database;