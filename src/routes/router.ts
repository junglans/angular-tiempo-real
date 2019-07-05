// Definimos los recursos del api REST.

import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { request } from 'https';
import { userList } from '../sockets/sockets';

const router = Router();

router.post('/messages', (req: Request, res: Response) => {

        const server: Server = Server.instance;

        server.io.emit('public-messages', req.body);

        res.json({
            ok: true,
            msg: 'Mensaje enviado.'
        });
});

router.post('/messages/:id', (req: Request, res: Response) => {

    const id = req.params.id;
    // Nos conectamos al server socket. No olvidar que es un singleton.
    const server: Server = Server.instance;

    server.io.in(id).emit('private-messages', req.body);

    res.json({
        ok: true,
        msg: 'Mensaje enviado'
    });
});



router.get('/users', (req: Request, res: Response) => {

    const server: Server = Server.instance;

    server.io.clients(( err: any, clients: string[]) => {

        if (err) {
            res.json({
                ok: false,
                payload: err
            });
        }

        res.json({

            ok: true,
            payload: clients

        });
    });

});

router.get('/users/detail', (req: Request, res: Response) => {

    res.json({

        ok: true,
        payload: userList.getUserList()

    });
    

});
// Return a user by the socket client id.
router.get('/users/:id', (req: Request, res: Response) => {

    const id = req.params.id;
    res.json({
        ok: true,
        msg: `Todo está correcto: Obtenido el id ${id}`
    });
});
export default router;