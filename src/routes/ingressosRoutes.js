import express from 'express';
import ingressosController from '../controllers/ingressosController.js';

const routes = express.Router();

routes.post('/ingressos', ingressosController.criarIngresso);

export default routes;