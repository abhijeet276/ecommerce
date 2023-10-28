import dotenv from "dotenv"
import app from "./app";
import db from "./db";
import { NextFunction, Request, Response } from "express";
import { ServerHandler } from "./middleware/serverSetup";
dotenv.config({path:"backend/config/config.env"})
const port = process.env.PORT || 5000;
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  next(err);
});
//connection to database 
db();
const serverHandler = new ServerHandler(app, Number(port));
serverHandler.startServer();