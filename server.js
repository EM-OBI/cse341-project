const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const swaggerDocument = require("./documentation/swagger-output.json");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();
const mongoose = require("mongoose");
const connectToDb = require("./src/database/connection");
const patientRoutes = require("./src/routes/patientRoutes");
const appointmentRoutes = require("./src/routes/appointmentRoutes");
const createError = require("http-errors");

app.use(cors());
pp.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


mongoose.set("strictQuery", false);

//Routes
app.get("/", (req, res, next) => {
  res.send("Welcome to my Dental Appointments API");
});

app.use("/patients", patientRoutes);
app.use("/appointments", appointmentRoutes);

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});

//Listen and start app after connection to DB
const startApp = async () => {
  try {
    connectToDb();
    mongoose.connection.once("open", () => {
      console.log("connected to mongoDB");
      app.listen(process.env.PORT || 3000, () => {
        console.log("Web Server is listening at port " + (process.env.PORT || 3000));
      });
    });
  } catch (error) {
    console.error(error);
  }
};

startApp();
