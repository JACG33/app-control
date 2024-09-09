import cors from "cors";
import express from "express";
import { app } from "./app.js";
import { makeSession } from "./config/session.manager.js";
import apiRoutes from "./routes/index.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createServer } from "node:http";
import {Server} from "socket.io"
import conversationSocket from "./sockets/conversation-socket.js";


const PORT = process.env.EXPRESS_PORT || 3000

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



makeSession()

app.use("/", apiRoutes)

app.use("/uploads", express.static(join(__dirname, "uploads")));

// /dist folder

app.use(
  [
    "/",
    "/profile",
    "/edit-user",
    "/users",
    "/create-user",
    "/edit-user/:id",
    "/roles",
    "/create-role",
    "/edit-role/:id",
  ],
  express.static(join(__dirname, "../dist/"))
)

app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "../dist/index.html"))
})

// socket.io

const httpServer=createServer(app)
const io = new Server(httpServer,{cors:{origin:"*"}})

// Converastion socket function init
conversationSocket(io)
// socket.io

httpServer.listen(PORT, (req, res) => {
  console.log(`Serve up on port ${PORT}`)
})