const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Dental appointments API",
    description: "Add, view, edit and delete patient and appointment"
  },
  host: process.env.NODE_ENV === 'production'
  ? 'cse341-project-bgro.onrender.com'
  : 'localhost:3000',
  schemes: ['https']
};


const outputFile = "./swagger-output.json";
const routes = ["../server.js"];

swaggerAutogen(outputFile, routes, doc);
