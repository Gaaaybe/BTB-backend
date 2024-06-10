import db from "../models/index.js";
import { pegarFilmesAPI, constroiObjetoFilme, pegarAtributosApartirDeFilmeID, constroiObjetoPoltrona } from "../services/objectService.js";

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
    const poltronas = await db.poltrona.findAll();
    // console.log(poltronas);
    // for (let i = 1; i <= 5; i++) {
    //     await db.poltrona.create({
    //         sala: 1,
    //         poltronaNum: i
    //     })
    // }
    const sessoes = await db.sessao.findAll();
    const salas = await db.sala.findAll();
    const filmes = await db.filme.findAll();
    const ingressos = await db.ingresso.findAll();
    // for (let i = 1; i <= 30; i++) {
    //     await db.poltrona.destroy({ where: { poltronaNum: i } });
    // }
    //await db.sala.destroy({ where: { salaNum: 2 } }); ""
    //pegarAtributosApartirDeFilmeID(2);
    //console.log("Filmes:", filmes[0]);
    
    await constroiObjetoFilme(filmes[1]);
   // console.log("Sessoes:", sessoes[0].dataValues, "\nSalas:", salas, "\nFilmes:", filmes[0].dataValues, "\nIngressos:", ingressos, "\nPoltronas:", poltronas[0].dataValues);
    //   constroiObjeto(filmeBuscado);
    // await db.sessao.create({
    //     sala: 1,
    //     filme: 2,
    //     horarioData: "2021-09-01",
    //     horarioHora: "09:00:00"
    // })


})();


export default filmesController;

