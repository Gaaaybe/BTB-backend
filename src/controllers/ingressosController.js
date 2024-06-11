import express from "express";
import db from "../models/index.js";
import { verificarFilme, verificarSessao, verificarSala, criarPoltronas } from "../services/ingressoService.js";

class ingressosController {

    static async criarIngresso(req, res) {
        const { filmeID, sessaoID, salaID, poltronaNum, usuarioID } = req.body;

        try {
            // Verificar se o filme, sessão e sala existem
            if (!(await verificarFilme(filmeID))) {
                return res.status(404).json({ error: 'Filme não encontrado' });
            }

            if (!(await verificarSessao(sessaoID))) {
                return res.status(404).json({ error: 'Sessão não encontrada' });
            }

            if (!(await verificarSala(salaID))) {
                return res.status(404).json({ error: 'Sala não encontrada' });
            }

            // Verificar se a poltrona existe e está disponível
            const poltrona = await db.Poltrona.findOne({ where: { salaID: salaID, poltronaNum: poltronaNum } });
            if (!poltrona || !poltrona.estado) {
                return res.status(400).json({ error: 'Poltrona não disponível' });
            }

            // Registrar ingresso
            const ingresso = await db.Ingresso.create({
                filmeID,
                sessaoID,
                salaID,
                poltronaNum,
                usuarioID
            });

            // Atualizar estado da poltrona para indisponível
            await poltrona.update({ estado: false });

            res.status(201).json(ingresso);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao registrar o ingresso' });
        }
    }

}

export default ingressosController;