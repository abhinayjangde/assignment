import { config as conf } from "dotenv"

conf();

const _config = {
    port: process.env.PORT || 4000,
    dbUri: process.env.DB_URI || "mongodb://root:root@localhost:27017/bookapi?authSource=admin&w=1",
    env: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
    },
    baseUrl: process.env.BASE_URL || "http://localhost:9000",
    frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
    mail: {
        service: process.env.MAIL_SERVICE,
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    },

}

export const config = Object.freeze(_config);