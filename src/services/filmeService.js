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
        filmesDetalhes.sort((a, b) => b.popularity - a.popularity);
        const filmesMaisPopulares = filmesDetalhes.slice(0, 6);
        return filmesMaisPopulares;
    } catch (error) {
        console.error(error);
    }
}

async function verificarFilme(filmeID) {
    const filmeBuscado = await db.filme.findOne({ where: { filmeID: filmeID } });
    return !!filmeBuscado;
}

async function pegarAtributosApartirDeFilmeID(filmeID) {
    try {
        const sessao = await db.sessao.findOne({ where: { filme: filmeID } });
        const poltronasSala = await db.poltrona.findAll({ where: { sala: sessao.sala } });
        const atributos = { sessao, poltronasSala };
        return atributos;

    } catch (error) {
        console.error(error);
    }

}

async function constroiObjetoPoltrona(poltrona) {

    const novaPoltrona = {
        id: poltrona.poltronaID,
        poltronaNum: poltrona.poltronaNum,
        estado: poltrona.poltronaEstado,
    }
    return novaPoltrona;
}

async function constroiObjetoHorario(sessao, poltronasSala) {
    let poltronas = [];

    for (let poltrona of poltronasSala) {
        poltronas.push(await constroiObjetoPoltrona(poltrona));
    }

    const horario = {
        id: sessao.sessaoID,
        sessao_horario: sessao.horarioHora,
        sessao_data: sessao.horarioData,
        poltronas: poltronas,
    }
    return horario;

}

async function constroiObjetoSala(atributos) {
    let horarios;
    if (Array.isArray(atributos)) {

        horarios = [];
        for (let atributo of atributos) {
            let horario = await constroiObjetoHorario(atributo.sessao, atributo.poltronasSala);
            horarios.push(horario);
        }
    } else {
        horarios = await constroiObjetoHorario(atributos.sessao, atributos.poltronasSala);
    }

    const novaSala = {
        salaNum: atributos.sessao.sala,
        horarios: Array.isArray(atributos) ? horarios : [horarios],
    };
    return novaSala;
}

async function constroiObjetoFilme(objeto) {
    const filmeID = objeto.filmeID || objeto.id;
    
    if (await verificarFilme(filmeID)) {
        const atributos = await pegarAtributosApartirDeFilmeID(objeto.filmeID);
        let salas = [];
        if (Array.isArray(atributos)) {
            for (let atributo of atributos) {
                let sala = await constroiObjetoSala(atributo);
                salas.push(...sala);
            }
        } else {
            let sala = await constroiObjetoSala(atributos);
            salas.push(sala);
        }
        try {
            const novoObjeto = {
                id: objeto.filmeID,
                titulo: objeto.titulo,
                sinopse: objeto.sinopse,
                salas: salas,
            }
            return novoObjeto;
        } catch (error) {
            console.error(error);
        }

    } else {
        const poltronas = Array.from({ length: 30 }, (_, index) => ({
            poltronaNum: index + 1,
            estado: true
        }));
        const salas = [
            {
                salaNum: 1,
                horarios: [
                    {
                        sessao_horario: '12:15:00',
                        sessao_data: '2024-12-13',
                        poltronas: poltronas,

                    },
                    {
                        sessao_horario: '14:15:00',
                        sessao_data: '2024-12-14',
                        poltronas: poltronas,
                    },
                ]
            },
            {
                salaNum: 2,
                horarios: [
                    {
                        sessao_horario: '16:15:00',
                        sessao_data: '2024-12-13',
                        poltronas: poltronas,
                    },
                    {
                        sessao_horario: '18:15:00',
                        sessao_data: '2024-12-14',
                        poltronas: poltronas,
                    }
                ]
            }
        ]
        const novoObjeto = {
            id: objeto.id,
            titulo: objeto.title,
            sinopse: objeto.overview,
            imagem: `https://image.tmdb.org/t/p/original/${objeto.poster_path}`,
            salas: salas,
        };
        return novoObjeto;

    }
}

export { pegarFilmesAPI, verificarFilme, constroiObjetoFilme, pegarAtributosApartirDeFilmeID, constroiObjetoPoltrona };