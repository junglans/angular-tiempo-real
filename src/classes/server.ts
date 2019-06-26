import { SERVER_PORT } from '../global/environment';

import bodyParser from 'body-parser';
import  router  from '../routes/router';
import cors from 'cors';
import express from 'express';
import socketIO, { Socket } from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets';
/**
 *  Servidor que implementa el patrón singleton.
 */
export default class Server {

    private static _instance: Server;

    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {

        this.app = express();
        this.port = SERVER_PORT;
        // El la libreria de express y el servidor de sockets se relacionan a través del httpServer.
        // Configure the io
        this.httpServer = new http.Server(this.app);
        // io listens/emits on port SERVER_PORT.
        this.io = socketIO(this.httpServer);

        this.listen();
    }

    public static get instance(): Server {
        return Server._instance || (Server._instance = new this());
    }
    
    public start(callback: Function) {

        // Body parser
        this.app.use(bodyParser.urlencoded( { extended: true }));
        this.app.use(bodyParser.json());
        // cors
        this.app.use(cors({origin: true, credentials: true}))

        this.app.use('/', router);
        this.httpServer.listen( this.port, callback() );
    }

    /**
     * Listen for connections. Whenever a user connects on port SERVER_PORT via
     * a websocket, log that a user has connected
     */
    private listen() {

        console.log('Escuchando en el socket...');
        this.io.on('connection', (client: Socket) => {

            console.log('Cliente conectado.');
            // Detectar la desconexión de un socket cliente
            socket.detectClientDisconnection(client);
           
        });


    }
}
