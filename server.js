require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const swaggerDocument = require("./documentation/swagger-output.json");
const swaggerUi = require("swagger-ui-express");
const mongoose = require("mongoose");
const connectToDb = require("./src/database/connection");
const patientRoutes = require("./src/routes/patientRoutes");
const appointmentRoutes = require("./src/routes/appointmentRoutes");
const oauthRoutes = require("./src/routes/oauthRoutes");
const session = require("./src/middlewares/sessions");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.set("strictQuery", false);

//Set up OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.NODE_ENV === "production"
          ? "cse341-project-bgro.onrender.com/oauth2/callback"
          : "http://localhost:3000/oauth2/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

//Routes
app.get("/", (req, res, next) => {
  res.send("Welcome to my Dental Appointments API");
});

app.use("/patients", patientRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/oauth2", oauthRoutes);

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
