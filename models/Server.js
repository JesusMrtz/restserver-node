import express from 'express';
import cors from 'cors';

import { dbConnection } from '../db/config.db.js';

import v1Users from '../v1/routes/users.routes.js';
import v1Auth from '../v1/routes/auth.routes.js';
import v1Categories from '../v1/routes/categories.routes.js';
import v1Products from '../v1/routes/products.routes.js';
import v1Searches from '../v1/routes/searches.routes.js';


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
        this.app.use('/api/v1/auth', v1Auth);
        this.app.use('/api/v1/users', v1Users);
        this.app.use('/api/v1/categories', v1Categories);
        this.app.use('/api/v1/products', v1Products);
        this.app.use('/api/v1/search', v1Searches);
    }

    listen() {
        this.app.listen(this.port , () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}