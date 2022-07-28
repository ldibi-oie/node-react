const express = require("express");
const dotenv = require("dotenv");
const SecurityRouter = require("../routes/security");
const UserRouter = require("../routes/user");
const SkillRouter = require("../routes/skills");
const MessagingRouter = require("../routes/messaging");
const ContactRouter = require("../routes/contact");
const logger = require("bunyan");
const cors = require("cors");
const { verifyToken } = require("../lib/jwt");
const server = express();
const STATIC_CHANNELS = ["global_notifications", "global_chat"];

require("../database/connnection");

server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
require("dotenv").config();
// console.log(process.env);
const sequelizeInstance = sequelize;

function connectionToPostGres() {
  sequelizeInstance
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((error) => {
      console.log("Unable to connect to the database:", error);
      process.exit(1);
    });
  sequelizeInstance.sync();
  return sequelizeInstance;
}
server.use(
  "/",
  SecurityRouter,
  UserRouter,
  SkillRouter,
  MessagingRouter,
  ContactRouter
);

server.use(express.json());

server.get("/getChannels", (req, res) => {
  res.json({
    channels: STATIC_CHANNELS,
  });
});

const app = server.listen(process.env.PORT || 3220);

const io = require("socket.io")(app, {
  path: "/socket.io",
});

io.on("connection", (socket) => {
  console.log("👾 New socket connected! >>", socket.id);
  socket.emit("connection", null);
});

io.attach(app, {
  // includes local domain to avoid CORS error locally
  // configure it accordingly for production
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
    transports: ["websocket", "polling"],
  },
  allowEIO3: true,
});

server.on("listening", () => {
  console.log(
    `listening on port ${server.address().port} in ${app.get("env")} mode.`
  );
});

module.exports = connectionToPostGres();
