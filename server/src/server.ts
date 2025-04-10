import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/dbConfig";
import cors from "cors";
import shortUrl from "./routes/shortUrl";

dotenv.config();
connectDb();
const port = process.env.PORT || 5001;
const app = express();
app.use(express.json()); //conver into JSON
app.use(express.urlencoded({extended: true})); // encode Url inbuild function
app.use(cors({  
  origin: "http://localhost:3000", //frontend URL
  credentials: true,
})
);
app.use("/api/",shortUrl);

app.listen(port, () => {
  console.log(`server started successfully on port: ${port}`);
});
