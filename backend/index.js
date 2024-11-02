import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./src/Config/db.js";
import cookieParser from "cookie-parser";
import NftRouter from "./src/routers/NftRouter/NftRouter.js";
import UserRouter from "./src/routers/UserRouter/User.Router.js";

//Algorand imports
import {
  createAccount,
  fundAccount,
  getBalance,
} from "./src/algo-utils/accountService.js";
import { sendTransaction } from "./src/algo-utils/transactionService.js";

dotenv.config();

const app = express();
const allowedOrigins = [
  "https://napft.com",
  "http://localhost:5173",
  "http://localhost:4000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin, like mobile apps or curl requests
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // If you are using cookies or sessions
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS", // Allow these methods
  })
);

app.use(bodyParser.json()); // Parses the body if it's in JSON format
app.use(cookieParser());
app.use(morgan("dev"));

connectDB();

//ALGORAND FUNCTIONS
app.post("/create-account", (req, res) => {
  const account = createAccount();
  res.json(account);
});

app.post("/fund-account", async (req, res) => {
  const { address } = req.body;
  await fundAccount(address);
  res.send("Account funded");
});

app.get("/balance/:address", async (req, res) => {
  const balance = await getBalance(req.params.address);
  res.json({ balance });
});

app.post("/send-transaction", async (req, res) => {
  const { fromAccount, toAccount, amount } = req.body;
  const result = await sendTransaction(fromAccount, toAccount, amount);
  res.json(result);
});

//nft and user routes
// app.use("/api/v1/nft", NftRouter);
// app.use("/api/v1/user", UserRouter);

const PORT = process.env.PORT || 8800;
const MODE = process.env.DEV_MODE;

app.listen(PORT, () => {
  console.log(`Server is running in ${MODE} MODE on port ${PORT}`);
});
