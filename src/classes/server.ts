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
    public socket: socketIO.Server;
    private httpServer: http.Server;

    public constructor() {

        this.app = express();
        this.port = SERVER_PORT;
        // Configuramos el socket.
        this.httpServer = new http.Server(this.app);
        this.socket = socketIO(this.httpServer);

        this.listenOnSocket();
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

    private listenOnSocket() {
        console.log('Escuchando en el socket...');
        this.socket.on('connection', client => {
            console.log('Cliente conectado.')
        });
    }
}
