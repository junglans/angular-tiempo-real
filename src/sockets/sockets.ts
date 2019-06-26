import { Socket } from "socket.io";


export const detectClientDisconnection = (client: Socket) => {
    client.on('disconnect', () => {
        console.log('Cliente desconectado.');
    });
}