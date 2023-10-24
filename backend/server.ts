import dotenv from "dotenv"
import app from "./app";
import db from "./db";
import { NextFunction, Request, Response } from "express";
import { CustomErrorHandler } from "./utils/errorHandler";
dotenv.config({path:"backend/config/config.env"})

const port = process.env.PORT || 5000;
app.use("*", (req, res) => {
    return res.status(404).json({
        success: false,
        message: "API endpoint doesnt exist",
    });
});
app.use((err, req, res, next) => {
  CustomErrorHandler.handle(err, req, res, next);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError) {
      return res.status(400).json({ error: 'Invalid JSON' });
    }
    next(err);
  });

//connection to database 
db()


app.listen(port ,()=>{
    console.log(`Server started on ${port}`);
})