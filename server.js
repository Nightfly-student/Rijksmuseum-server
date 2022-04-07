import express from "express";
import path from 'path';
import {fileURLToPath} from 'url';
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import paintingRouter from "./routers/paintingRouter.js";
import collectionRouter from "./routers/collectionRouter.js";
import artistRouter from "./routers/artistRouter.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost/rijks",
  {
    useNewUrlParser: true,
  }
);
app.use("/api/artists", artistRouter);
app.use('/api/collections', collectionRouter);
app.use("/api/paintings", paintingRouter);


// Handle Production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/public/"));
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
