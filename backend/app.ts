import express from "express"
import routes from "./routes"
import { errorHandler } from "./middleware/error";
import cookieParser from "cookie-parser"
const app = express();

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1", routes)
app.use("*", (req, res) => {
    return res.status(404).json({
        success: false,
        message: "API endpoint doesnt exist",
    });
});
// Error Handling middleware
app.use(errorHandler);

export default app;