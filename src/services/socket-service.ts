import { io } from 'socket.io-client';

class SocketioService {
    socket: any;
    constructor() {}

    setupSocketConnection() {
        this.socket = io("http://localhost:8080", { transports: ['websocket', 'polling', 'flashsocket'] });
    }
}

export default new SocketioService();