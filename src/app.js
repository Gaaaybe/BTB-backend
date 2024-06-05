import express from 'express';
//import conectarNaDB from './config/dbconnect.js';
//import routes from './routes/index.js';

//const conexao = await conectarNaDB();
//conexao.on("error", (erro) => { console.log("Erro ao conectar no banco de dados: " + erro)});

// conexao.once("open", () => { // Conexão bem sucedida
//     console.log("Conexão com o banco de dados realizada com sucesso");
// });

const app = express();
//routes(app);

export default app;