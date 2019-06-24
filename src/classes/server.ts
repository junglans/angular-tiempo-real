import express from 'express';
import bodyParser from 'body-parser';
import  router  from '../routes/router';
import { SERVER_PORT } from '../global/environment';
import cors from 'cors';

export default class Server {

    public app: express.Application;
    public port: number;

    public constructor() {

        this.app = express();
        this.port = SERVER_PORT;

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
}
