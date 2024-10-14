const express = require('express');
const app = express();
const cors = require("cors");
const path = require('path');
const routes = require("./routes/index.routes");

app.use(express.json());
app.use(cors());

// Serve static images from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/", routes);

const db = require("./models");

db.sequelize.sync({ alter: true }).then(() => {
  app.listen(3002, () => {
    console.log("SERVER RUNNING ON PORT 3002");
  });
});
