import {io} from "../index";
import {debug, log, warn} from "./logger";
import {SocketMessage} from "./types/socket-types";
import {RoomClient} from "./socket-client";

export let room: RoomClient = new RoomClient();

export function socketHandler(socket: any) {
    log(`New Connection with id (${socket.id})`);
    socket.on("join", (msg: SocketMessage) => {
        log(`${msg.userId} joined the chat room`);
        warn(JSON.stringify(msg));
        room.join(socket.id, msg.userId);
        io.emit("message", {
            type: "SERVER_INFO",
            userId: "SERVER",
            message: `${msg.userId} joined the chat room`,
        });
    });

    socket.on("message", (msg: SocketMessage) => {
        log(`${msg.userId}: ${msg.message}`);
        room.usersSocketsId().forEach(e => { io.to(e).emit("message", msg); });
    });

    socket.on("disconnect", () => {
        log(`User disconnected: ${socket.id}`);
        io.emit("message", {
            type: "SERVER_INFO",
            userId: "SERVER",
            message: `${room.getClientNameBySocketId(socket.id)} disconnected from chat room`,
        });
       room.disconnectClientBySocketId(socket.id);
        debug(`there is (${room.usersNumber()}) users connected`)

    });
}
