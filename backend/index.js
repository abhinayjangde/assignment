import app from "./src/app.js";
import { config } from "./src/configs/config.js";
import db from "./src/configs/db.js";


const startServer = async () => {
    await db();
    const port = config.port;
    app.listen(port, () => {
        console.log(`Server is running on port http://localhost:${port}`);
    });

};

startServer();