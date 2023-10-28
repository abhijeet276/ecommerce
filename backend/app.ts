import express from "express"
import product from "./routes/productRoutes"
import { errorHandler } from "./middleware/error";
const app = express();

app.use(express.json())


app.use("/api/v1", product)
app.use("*", (req, res) => {
    return res.status(404).json({
        success: false,
        message: "API endpoint doesnt exist",
    });
});
// Error Handling middleware
app.use(errorHandler);

export default app;