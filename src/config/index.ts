import dotenv from "dotenv"
import path from "path"

dotenv.config({path: path.join(process.cwd(), ".env")})
export default {
    salt: process.env.SALT,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
    access_token_expire_time: process.env.ACCESS_TOKEN_EXPIRE_TIME,
    refresh_token_expire_time: process.env.REFRESH_TOKEN_EXPIRE_TIME
}