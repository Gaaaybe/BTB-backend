import express from 'express';

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send('Ta funcionando!'));
    app.use(express.json());
};

(async ()=>{
    console.log('Funciona?');
})();

export default routes;