
import db  from "../models/index.js";

class filmesController{
    static async listarFilmes(req, res){
        try {
            const filmes = await db.filme.findAll();
            return res.status(200).json(filmes);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }
}

export default filmesController;

