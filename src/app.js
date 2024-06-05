import express from 'express';
import conectarNaDB from './config/dbConnect.js';
import routes from './routes/index.js';

await conectarNaDB();

const app = express();
routes(app);

export default app;