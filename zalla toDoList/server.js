const express = require("express");

const app = express();
const connectToDataBse = require("./db/connectToDataBase");
const dotenv = require("dotenv");
const cors = require("cors");
//route

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRoute");
const taskRoute = require("./routes/taskRoute");
dotenv.config();
connectToDataBse();

app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  console.log(origin);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", origin);
  next();
});

app.use("/user", userRoute);
app.use("/task", taskRoute);

app.listen(3500, console.log("server work on port 3500"));
