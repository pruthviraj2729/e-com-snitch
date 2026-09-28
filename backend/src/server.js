import config from "./config/config.js";
import app from "./app/app.js";
import dbConnect from "./config/dbConnect.js";


await dbConnect()

app.listen(config.PORT, () => {
    console.log(`server is running on port ${config.PORT}`)
})