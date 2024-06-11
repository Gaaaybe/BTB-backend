import express from 'express';
import IngressosController from '../controllers/ingressosController.js';

const routes = express.Router();

routes.post('/ingressos', IngressosController.criarIngresso);

export default routes;