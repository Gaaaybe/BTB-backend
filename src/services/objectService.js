import axios from "axios";
import db from "../models/index.js";

async function pegarFilmesAPI() {
    try {
        const filmesLancamentos = await axios.get('https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=1&region=BR&api_key=118db2dd95c62445f074204474d7a5c0');
        const ids = filmesLancamentos.data.results.map(filme => filme.id);

        const filmesDetalhes = await Promise.all(ids.map(async (id) => {
            const resposta = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=118db2dd95c62445f074204474d7a5c0&append_to_response=release_dates&language=pt-BR&region=BR`);
            return resposta.data;
        }));
        return filmesDetalhes;

    } catch (error) {
        console.error(error);
    }
}

async function verificarFilme(filmeID) {
    const filmeBuscado = await db.filme.findOne({ where: { filmeID: filmeID } });
    return !!filmeBuscado;
}

async function pegarAtributosApartirDeFilmeID(filmeID) {
    try{
        const sessao = await db.sessao.findOne({ where: { filme: filmeID } });
        const poltronasSala = await db.poltrona.findAll({ where: { sala: sessao.sala } });
        const atributos = { sessao, poltronasSala };
        return atributos;

    }catch(error){
        console.error(error);
    }
    
}

async function constroiObjetoPoltrona(poltrona) {
    
//     const novaPoltrona = {
//         id: poltrona.poltronaID,
//         num: poltrona.poltronaNum,
//         estado: poltrona.poltronaEstado,
//     }
//     return novaPoltrona;
}

async function constroiObjetoHorario(sessao, sala) {
    //let poltronas = constroiObjetoPoltrona(sala.poltrona);
    //console.log(poltronas);
    //poltronas.forEach(poltrona => constroiObjetoPoltrona(poltrona));

    //const horario = {
    //    id: sessao.sessaoID,
    //    sessao_horarios: sessao.horarioHora,
    //    sessao_data: sessao.horarioData,
    //    poltronas: ""
    //}
    //return horario;

}

async function constroiObjetoSala(atributos) {
    //let horarios;
    //horarios.forEach(horario => constroiObjetoHorario(horario, sala));
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa",atributos.sessao,"AAAAAAA", atributos.poltronasSala,"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    let horarios = constroiObjetoHorario(atributos.sessao, atributos.poltronasSala);
    console.log(horarios);
    const novaSala = {
        id: atributos.poltronasSala.salaNum,
        horarios: '',
    }
    return novaSala;

}

async function constroiObjetoFilme(objeto) {

    if (verificarFilme(objeto.filmeID)) {
        const atributos = await pegarAtributosApartirDeFilmeID(objeto.filmeID);
        let sala = constroiObjetoSala(atributos);
        console.log(atributos);
        console.log(sala);
        console.log(objeto);
        try {
            const novoObjeto = {
                id: objeto.filmeID,
                titulo: objeto.titulo,
                sinopse: objeto.sinopse,
                salas: '',
            }
            console.log(novoObjeto);
        } catch (error) {
            console.error(error);
        }
    }
}
// const filmes = filmesDetalhes.results;
// console.log(filmesDetalhes[1]);

// const classInd = filmesDetalhes[1].release_dates.results.find(release => release.iso_3166_1 === 'US').release_dates[0].certification;
// console.log("clasi: ",classInd);
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

export { pegarFilmesAPI, verificarFilme, constroiObjetoFilme, pegarAtributosApartirDeFilmeID, constroiObjetoPoltrona };