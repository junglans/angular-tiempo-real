// Definimos los recursos del api REST.

import { Router, Request, Response } from 'express';
import Server from '../classes/server';

const router = Router();

router.get('/messages', (req: Request, res: Response) => {

        res.json({
            ok: true,
            msg: 'Todo está correcto: GET'
        });
});

router.post('/message/:id', (req: Request, res: Response) => {

    const id = req.params.id;
    // Nos conectamos al server socket. No olvidar que es un singleton.
    const server: Server = Server.instance;

    server.io.in(id).emit('private-messages', req.body);

    res.json({
        ok: true,
        msg: 'Mensaje enviado'
    });
});

router.get('/user/:id', (req: Request, res: Response) => {

    const id = req.params.id;
    res.json({
        ok: true,
        msg: `Todo está correcto: Obtenido el id ${id}`
    });
});

router.post('/user', (req: Request, res: Response) => {

    const name = req.body.name;
    const surname = req.body.surname;

    res.json({
        ok: true,
        msg: name + ' ' + surname
    });
});

export default router;