import socketIO, { Socket } from 'socket.io';
/**
 * This method detects a client disconnection event.
 * @param client 
 */
export const detectClientDisconnection = (client: Socket) => {
    client.on('disconnect', () => {
        console.log('Socket.detectClientDisconnection> Client disconnected.');
    });
}

export const listenForMessages = ( client: Socket,  io: socketIO.Server) => {

    client.on('messages', (message: {_senderId:string, _payload:any}) => {

        console.log(`Socket.listenForMessages> Message received on 'messages'`);
        console.log('Socket.listenForMessages> Payload: ' + JSON.stringify(message));

        // Take the message received a broadcast it to clients.
        client.broadcast.emit('messages', message);

    });

    client.on('configure-user', (payload: {username: string}, callback: Function) => {
        console.log(payload.username);
        // Llamamos a la función de callback para indicar que el evento se
        // recibido correctamente,
        callback({
            ok: true,
            msg: `Usuario "${payload.username}" configurado correctamente.`
        });
    });

}