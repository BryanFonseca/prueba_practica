const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/index");
const errorHandler = require("./app/middlewares/error_handler");
// const swaggerUI = require("swagger-ui-express");

const { dummyMiddleware } = require("./routes/helpers");

// import routes

// import models

// stablish models relationships
/*
RolDePago.belongsTo(Empleado);
RolDePago.hasMany(Concepto);
*/

const app = express();

const path = __dirname + "/views/";
const port = process.env.DEVSERVER_PORT;

// const docs = require("./docs");

app.use((req, res, next) => {
  console.log("/" + req.method);
  next();
});

app.use(bodyParser.json());

// cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.static(path));
app.use(express.urlencoded({ extended: false }));

// RUTAS
//app.use("/example", exampleRoutes);
app.use("/example", dummyMiddleware("working"));

// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs));

// error handling
app.use(errorHandler);

sequelize
  .sync()
  .then((result) => {
    app.listen(port, () => console.log(`App listening on port ${port}`));
  })
  .catch((err) => {
    console.log(err);
  });
