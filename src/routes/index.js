import express from 'express';
import filmes from './filmesRoutes.js';

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send('Ta funcionando!'));
    app.use(express.json(), filmes);
};

export default routes;