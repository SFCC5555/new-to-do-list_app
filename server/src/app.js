const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth.routes");
const tasksRoutes = require("./routes/tasks.routes");

//const notFound = require("./middlewares/notFound");

//const corsOptions = require("./libs/corsOptions");
const config = require("./config");

const app = express();

// Middlewares

//app.use(cors());
//app.use(cors(corsOptions(config.allowedOrigins))); // Apply CORS middleware with configured options

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", authRoutes);
app.use("/api/v1", tasksRoutes);

// Servir archivos estáticos desde 'client'
app.use(express.static(path.join(__dirname, '../../client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  });
  

//app.use(notFound);

module.exports = app;
