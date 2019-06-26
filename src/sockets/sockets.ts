import { Socket } from "socket.io";

/**
 * This method detects a client disconnection event.
 * @param client 
 */
export const detectClientDisconnection = (client: Socket) => {
    client.on('disconnect', () => {
        console.log('Socket.detectClientDisconnection> Client disconnected.');
    });
}

export const listenForMessages = (eventName: string, client: Socket) => {

    client.on(eventName, (payload: any) => {

        console.log(`Socket.listenForMessages> Message received on ${eventName}`);
        console.log('Socket.listenForMessages> Payload: ' + JSON.stringify(payload));

    })

}