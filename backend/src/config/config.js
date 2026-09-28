import dotenv from "dotenv";

dotenv.config()

const config = {
    MONGO_URI : process.env.MONGO_URI,
    PORT: process.env.PORT,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN_SECRET,
    URL_ENDPOINT: process.env.URL_ENDPOINT,
    PRIVATE_KEY: process.env.PRIVATE_KEY

}

export default config