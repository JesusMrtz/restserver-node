import express from 'express';
import cors from 'cors';
import v1Users from '../v1/routes/users.routes.js';
import { dbConnection } from '../db/config.db.js';


export class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Conectar a base de datos
        this.connectDatabase();

        // Middleware
        this.middlewares();


        // Rutas de la aplicación
        this.routes();
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