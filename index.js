const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
let compression = require("compression");
require("dotenv").config();

const app = express();

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded());
app.use(helmet());
app.use(cors());
app.use(compression());

const mongoConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepAlive: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

const db = require("./api/models");

db.mongoose
  .connect(process.env.MONGO_URI, mongoConnectOptions)
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// Routes
const userRoutes = require("./api/routes/userRoutes");
const todoRoutes = require("./api/routes/toDoRoutes");

app.use("/api/v1", [userRoutes, todoRoutes]);

// Listen
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running at http://127.0.0.1:${port}`);
});
