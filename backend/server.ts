import express from "express";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI as string;
mongoose.connect(uri, { useNewURLPArser: true } as ConnectOptions);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const questionsRouter = require("./routes/questions");
app.use("/questions", questionsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
