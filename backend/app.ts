import express from "express"
import routes from "./routes"
import { errorHandler } from "./middleware/error";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors());
app.use("/api", routes)
app.use("*", (req, res, next) => {
    return res.status(404).json({
        success: false,
        message: "API endpoint doesnt exist",
    });
});
// Error Handling middleware
app.use(errorHandler);

export default app;