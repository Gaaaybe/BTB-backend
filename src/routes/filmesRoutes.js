import express from 'express';
import FilmesController from '../controllers/filmesController.js';

const routes = express.Router();

routes.get('/filmes', FilmesController.listarFilmes);

