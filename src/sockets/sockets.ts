import socketIO, { Socket } from 'socket.io';
import { UserList } from '../model/user_list';
import { User } from '../model/user';

export const userList: UserList = UserList.getInstance();
/**
 * 
 * @param client This method creates a new user from a socket connection. No user information yet,
 */
export const detectClientConnection = ( client: Socket, io: SocketIO.Server) => {

    userList.add(new User(client.id, 'no-name', 'no-room'));
    // On client connection we return the client id assigned to the client socket.
    io.in(client.id).emit('user-id', {from: 'server', payload: client.id});
    // console.log( 'Socket.detectClientConnection>Connected Users :' + JSON.stringify(userList.getUserList())) ;

}
/**
 * This method detects a client disconnection event.
 * @param client 
 */
export const detectClientDisconnection = (client: Socket, io: SocketIO.Server) => {
    client.on('disconnect', () => {
        //console.log('Socket.detectClientDisconnection> Client disconnected.');
        userList.deleteUser(client.id);
        // Notificamos el cambio de la lista.
        io.emit('user-connection', {from: 'server', payload: userList.getUserList().filter( item => item.username !== 'no-name')});
       // console.log( 'Socket.detectClientDisconnection> Connected Users :' + JSON.stringify(userList.getUserList())) ;
    });
}

export const listenForMessages = ( client: Socket,  io: socketIO.Server) => {

    client.on('public-messages', (message: {_serderid:string, _payload:any}) => {

        console.log(`Socket.listenForMessages> Message received on 'messages'`);
        console.log('Socket.listenForMessages> Payload: ' + JSON.stringify(message));

        // Take the message received a broadcast it to clients.
        client.broadcast.emit('public-messages', message);

    });
}

export const listenForUserConnections = (client: Socket, io: SocketIO.Server) => {
    client.on('configure-user', (payload: {username: string}, callback: Function) => {
         
        const user: User | undefined = userList.getUser(client.id);
        console.log( 'Socket.listenForUserConnections> User :' + JSON.stringify(user));
        if (user) {
            user.username = payload.username;
            // Emitimos un evento notificando que hay un nuevo usuario configurado con su nombre.
            io.emit('user-connection', {from: 'server', payload: userList.getUserList().filter( item => item.username !== 'no-name')});
        }
        console.log( 'Socket.listenForUserConnections> Connected Users :' + JSON.stringify(userList.getUserList()));
        
        // Llamamos a la función de callback para indicar que el evento se
        // recibido correctamente,
       
        callback({
            ok: true,
            msg: `Usuario "${payload.username}" configurado correctamente.`
        });
    });
}

export const listenForUserConnectedRequest = (client: Socket, io: SocketIO.Server) => {
    client.on('active-users-request', ( payload: any, callback: Function ) => {
        
        io.in(client.id).emit('active-users-request', {from: 'server', payload: userList.getUserList().filter( item => item.username !== 'no-name') });
        callback({
            ok: true,
            msg: 'Petición procesada'
        });
    });
}