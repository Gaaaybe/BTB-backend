import axios from "axios";
import db from "../models/index.js";

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

    try {
        
        const filmesLancamentos = await axios.get('https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=1&region=BR&api_key=118db2dd95c62445f074204474d7a5c0');
        const ids = filmesLancamentos.data.results.map(filme => filme.id);
        async function getFilmes(ids) {
            const resposta = await axios.get(`https://api.themoviedb.org/3/movie/${ids}?api_key=118db2dd95c62445f074204474d7a5c0&append_to_response=release_dates&language=pt-BR&region=BR`);
            return resposta.data;
        }
        const filmesDetalhes = await Promise.all(ids.map(id => getFilmes(id)));
        const filmes = filmesDetalhes.results;
        console.log(filmesDetalhes[1]);
        
        const classInd = filmesDetalhes[1].release_dates.results.find(release => release.iso_3166_1 === 'US').release_dates[0].certification;
        console.log("clasi: ",classInd);

    } catch (error) {
        console.error(error);
    }
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

    // })
    // } catch (error) {
    //     console.error(error);
    // }

    // try {
    //     await db.sala.create({

    //         filmeID: 209,
    //         titulo: "Vingadores 8",
    //         diretor: "Christopher Nolan",
    //         estudio: "Marvel Studios",
    //         duracao: "09:49:00",
    //         classInd: 75,
    //         genero: "Filme generico",
    //         sinopse: "Uns herois lutam contra uns vilões"

    // })
    // } catch (error) {
    //     console.error(error);
    // }



    // try {
    //     const filmes = await db.filme.findAll();
    //     console.log(filmes);
    // } catch (error) {
    //     console.error(error);
    // }
    console.log('Funciona?');
})();

export default filmesController;

