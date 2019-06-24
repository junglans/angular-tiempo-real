import { SERVER_PORT } from '../global/environment';

import bodyParser from 'body-parser';
import  router  from '../routes/router';
import cors from 'cors';
import express from 'express';
import socketIO from 'socket.io';
import http from 'http';

export default class Server {

    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;

    public constructor() {

        this.app = express();
        this.port = SERVER_PORT;
        // Configure the io
        this.httpServer = new http.Server(this.app);
        // io listens/emits on port SERVER_PORT.
        this.io = socketIO(this.httpServer);

        this.listen();
    }

    public start(callback: Function) {

        // Body parser
        this.app.use(bodyParser.urlencoded( { extended: true }));
        this.app.use(bodyParser.json());
        // cors
        this.app.use(cors({origin: true, credentials: true}))

        this.app.use('/', router);
        this.app.listen( this.port, callback() );
    }

    /**
     * Listen for connections. Whenever a user connects on port SERVER_PORT via
     * a websocket, log that a user has connected
     */
    private listen() {
        console.log('Escuchando en el socket...');
        this.io.on('connection', client => {
            console.log('Cliente conectado.')
        });
    }
}
