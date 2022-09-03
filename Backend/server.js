const express = require("express");
const cors = require("cors");
const { MONGO_DB_URI, MONGO_DB_URI_TEST } = require("./src/config/db.config");
const { ENV_PRODUCTION, ENV_DEVELOPMENT } = require("./src/config/env.config");
const { NODE_ENV } = process.env;

// Environment configuration for db and ip add
const dbConfig = NODE_ENV === 'test'
  ? MONGO_DB_URI_TEST
  : MONGO_DB_URI
const ORIGIN_FRONT = NODE_ENV === 'production'
  ? ENV_PRODUCTION
  : ENV_DEVELOPMENT

const app = express();

var corsOptions = {
  origin: ORIGIN_FRONT,
  credentials:true,         
  optionSuccessStatus:200
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./src/models");
const Role = db.role;
db.mongoose
  .connect(`mongodb://${dbConfig.USER}:${dbConfig.PASSWORD}@${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "API CINEMART." });
});

// routes (aquí lee las rutas)
require("./src/routes/auth.routes")(app);
require("./src/routes/user.routes")(app);
require("./src/routes/film.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8081;
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = { app, server }

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}