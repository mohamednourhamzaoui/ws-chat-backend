export type SocketMessage = {
    type: string;
    message: string;
    userId: string;
}

export type UserSocket = {
    userId: string;
    socketId: string;
}