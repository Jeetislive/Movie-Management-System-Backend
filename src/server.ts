import express from "express";
import cors from "cors";
import indexRoute from "./routes/indexRoute.js";
import { errorHandler } from "./error/ErrorHandler.js";

const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
    {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware to log requests
app.use("/", indexRoute);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
