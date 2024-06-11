import axios from "axios";
import db from "../models/index.js";


async function verificarFilme(filmeID) {
    const filmeBuscado = await db.Filme.findOne({ where: { filmeID: filmeID } });
    return !!filmeBuscado;
}

async function verificarSessao(sessaoID) {
    const sessaoBuscada = await db.Sessao.findOne({ where: { sessaoID: sessaoID } });
    return !!sessaoBuscada;
}

async function verificarSala(salaID) {
    const salaBuscada = await db.Sala.findOne({ where: { salaID: salaID } });
    return !!salaBuscada;
}

async function criarPoltronas(salaID, quantidade) {
    const poltronas = Array.from({ length: quantidade }, (_, index) => ({
        poltronaNum: index + 1,
        estado: true,
        salaID: salaID
    }));

    await db.Poltrona.bulkCreate(poltronas);
}

export { verificarFilme, verificarSessao, verificarSala, criarPoltronas }