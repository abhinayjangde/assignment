import app from "./src/app.js";
import { config } from "./src/configs/config.js";

app.listen(config.port, () => {
    console.log(`Server is running on port http://localhost:${config.port}`);
});
