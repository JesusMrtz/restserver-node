import express from 'express';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import { dbConnection } from '../db/config.db.js';

import v1Routes from '../v1/routes/index.routes.js';
import { socketController } from '../sockets/SocketController.js';


export class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Configuración para el SocketIO
        this.server = createServer(this.app);
        this.io = new SocketServer(this.server);

        // Conectar a base de datos
        this.connectDatabase();

        // Middleware
        this.middlewares();


        // Rutas de la aplicación
        this.routes();

        // Escuchar eventos de los sockets
        this.sockets();
    }

    async connectDatabase() {
        await dbConnection();
    }

    middlewares() {
        /** cors */
        this.app.use(cors());

        /** Lectura y parseo del body */
        this.app.use(express.json());
        
        /** Directorio público */
        this.app.use(express.static('public'));

        /**  Manejar la carga de archivos */
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }

    routes() {
        this.app.use('/api/v1/auth', v1Routes.v1Auth);
        this.app.use('/api/v1/users', v1Routes.v1Users);
        this.app.use('/api/v1/categories', v1Routes.v1Categories);
        this.app.use('/api/v1/products', v1Routes.v1Products);
        this.app.use('/api/v1/search', v1Routes.v1Searches);
        this.app.use('/api/v1/uploads', v1Routes.v1Upload);
    }

    sockets() {
        this.io.on('connection', (socket) => socketController(socket, this.io));
    }

    listen() {
        this.server.listen(this.port , () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}