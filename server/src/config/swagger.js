const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog Management API",
      version: "1.0.0",
      description: "A production-ready Blog Management REST API built with Node.js, Express, MongoDB, JWT Authentication, Swagger and automated testing.",
      contact: {
        name: "Darya",
        email: "Darya@email.com"
      }
    },

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },    
    servers: [
      {
url:
      process.env.NODE_ENV === "production"
        ? "https://blog-management-system-htx3.onrender.com"
        : "http://localhost:5000",
      },
    ],
  },

  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;