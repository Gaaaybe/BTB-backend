import db from "../models/index.js";
import { pegarFilmesAPI, constroiObjeto } from "../services/objectService.js";

class filmesController {
    static async listarFilmes(req, res) {
        try {
            const filmes = await db.filme.findAll();
            return res.status(200).json(filmes);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

(async () => {

    // try {
    //     await db.filme.create({

    //         filmeID: 209,
    //         titulo: "Vingadores 8",
    //         diretor: "Christopher Nolan",
    //         estudio: "Marvel Studios",
    //         duracao: "09:49:00",
    //         classInd: 75,
    //         genero: "Filme generico",
    //         sinopse: "Uns herois lutam contra uns vilões"

    //     })
    // } catch (error) {
    //     console.error(error);
    // }

    //    const filmes = await pegarFilmesAPI();
    //    console.log('Funciona:', filmes[0].id);
    //    const filmeBuscado = await db.filme.findOne({ where: { filmeID: 209 } });
    // await db.sala.create({
    //     salaNum: 1,
    //     salaCapacidadeTotal: 30,
    //     salaCapacidadeAtual: 30
    // });
    //await db.poltrona.create({
    
    //})
    const sessoes = await db.sessao.findAll();
    const salas = await db.sala.findAll();
    const filmes = await db.filme.findAll();
    const ingressos = await db.ingresso.findAll();
    const poltronas = await db.poltrona.findAll();
    //await db.sala.destroy(); ""
    console.log("Sessoes:", sessoes[0].dataValues, "\nSalas:", salas[0].dataValues, "\nFilmes:", filmes[0].dataValues, "\nIngressos:", ingressos, "\nPoltronas:", poltronas[0].dataValues);
    //   constroiObjeto(filmeBuscado);
})();


export default filmesController;

