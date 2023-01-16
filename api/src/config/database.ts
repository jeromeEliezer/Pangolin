import mongoose, { ConnectOptions } from "mongoose";
import { logcatch } from "src/utils/logger";
import config from "./env";

(async () => {
    try {
        const mongooseOptions: ConnectOptions = {
            connectTimeoutMS: 1000
        }
        mongoose.set('strictQuery', false);
        await mongoose.connect(config.mongo_uri, mongooseOptions);
    } catch (error) {
        logcatch(error, "err")
    }
})()