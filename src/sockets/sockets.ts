import socketIO, { Socket } from 'socket.io';
import { UserList } from '../model/user_list';
import { User } from '../model/user';

export const userList: UserList = UserList.getInstance();
/**
 * 
 * @param client This method creates a new user from a socket connection.
 */
export const detectClientConnection = ( client: Socket ) => {

    userList.add(new User(client.id));
    console.log( 'Socket.detectClientConnection>Connected Users :' + JSON.stringify(userList.getUserList())) ;

}
/**
 * This method detects a client disconnection event.
 * @param client 
 */
export const detectClientDisconnection = (client: Socket) => {
    client.on('disconnect', () => {
        console.log('Socket.detectClientDisconnection> Client disconnected.');
        userList.deleteUser(client.id);
        console.log( 'Socket.detectClientDisconnection> Connected Users :' + JSON.stringify(userList.getUserList())) ;
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

        const user: User | undefined = userList.getUser(client.id);
        if (user) {
            user.username = payload.username;
        }
        // Llamamos a la función de callback para indicar que el evento se
        // recibido correctamente,
        callback({
            ok: true,
            msg: `Usuario "${payload.username}" configurado correctamente.`
        });
    });

}