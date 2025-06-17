import {debug} from "./logger";

class Client {

    socketId: string;
    userName: string = "";

    constructor(socketId: string) { this.socketId = socketId; }

    public setUserName(userName: string) {
        this.userName = userName;
    }

    public equals(socketId: string, userName: string) {
        return this.userName === userName || this.socketId === socketId;
    }

    public update(socketId: string, userName: string){
        this.socketId = socketId;
        this.userName = userName;
    }

}

export class RoomClient {
    client: Client[];
    constructor() { this.client = [] };

    private createNewClient(socketId: string, name: string){
        let newClient = new Client(socketId);
        newClient.setUserName(name);
        return newClient;
    }

    public join(socketId: string, name: string) {
        const clientIndex = this.client.findIndex(user => user.equals(socketId, name));
        if (clientIndex > -1) {
            this.client[clientIndex].update(socketId, name);
            debug(`client updated connection info (${name})`);
        } else {
            this.client.push(this.createNewClient(socketId, name));
            debug(`new client join with name (${name})`);
        }

    }

    public usersSocketsId() {
        return this.client.map(u => u.socketId);
    }

    public getClientNameBySocketId(socketId: string) {
        return this.client.find(u => u.socketId === socketId)?.userName;
    }

    public disconnectClientBySocketId(socketId: string) {
        this.client = this.client.filter(u => u.socketId !== socketId);
    }

    public usersNumber() {
        return this.client.length;
    }

}