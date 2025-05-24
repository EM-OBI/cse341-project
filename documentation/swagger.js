const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Dental appointments API",
    description: "Add, view, edit and delete patient and appointment"
  },
  host: process.env.NODE_ENV === 'production'
  ? 'cse341-project-bgro.onrender.com'
  : 'localhost:3000',
};


const outputFile = "./swagger-output.json";
const routes = ["../server.js", "../src/routes/appointmentRoutes.js", "../src/routes/patientRoutes.js"];

swaggerAutogen(outputFile, routes, doc);
