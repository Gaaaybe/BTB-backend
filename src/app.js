import express from 'express';
import sequelize from './config/db.js';
import routes from './routes/index.js';

async function autenticarBD(){
    try {
        await sequelize.authenticate();
        console.log('Conexão bem sucedida com o banco de dados');
    } catch (error) {
        console.error('Incapaz de conectar com o banco de dados: ', error);
    }
};

autenticarBD();

const app = express();
routes(app);

export default app;

