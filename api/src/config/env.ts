import dotenv from 'dotenv';
dotenv.config();

const config = {
    front_end_url: process.env.FRONT_END,
    port: Number(process.env.PORT) ,
    mongo_uri : String(process.env.MONGO_DB_URI),
    jwt_secret: String( "secret" || process.env.JWT_SECRET)
}

export default config;