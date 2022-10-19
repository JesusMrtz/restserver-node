import express from 'express';
import cors from 'cors';
import v1Users from '../v1/routes/users.routes.js';


export class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Middleware
        this.middlewares();


        // Rutas de la aplicación
        this.routes();
    }

    middlewares() {
        /** cors */
        this.app.use(cors());

        /** Lectura y parseo del body */
        this.app.use(express.json());
        
        /** Directorio público */
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use('/api/v1/users', v1Users)
    }

    listen() {
        this.app.listen(this.port , () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}