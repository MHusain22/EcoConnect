import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import userRouter from "./routes/userRoute.js";
import initiativeRouter from "./routes/initiativeRoute.js";
import postRouter from "./routes/postRoute.js";

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

dotenv.config();

connectDB();

app.use("/user", userRouter);
app.use("/initiative", initiativeRouter);
app.use("/post", postRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
