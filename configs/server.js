'use strict'

import express from "express"
import cors from 'cors'
import helmet from "helmet"
import morgan from "morgan"
import  tareaRoutes from '../src/Tareas/tarea.routes.js';
import { dbConnection } from "./mongo.js"

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.tareaPath = '/blog/v1/tarea';

        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB() {
        await dbConnection()
    }

    middlewares() {
        this.app.use(express.json({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use(this.tareaPath, tareaRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port)
        })
    }
}

export default Server