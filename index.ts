import Server from './src/classes/server';
import { SERVER_PORT } from './src/global/environment';

const server = new Server();

server.start(() => {
    console.log(`Servidor iniciado en el puerto : ${server.port}`)
});