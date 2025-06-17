import express from 'express';
import { log } from "./lib/logger";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import {room, socketHandler} from "./lib/socket";

const app = express();
const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

app.use(cors());

export const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", socketHandler);

server.listen(PORT, () => {
    log(`Server is running on http://localhost:${PORT}`);
});

