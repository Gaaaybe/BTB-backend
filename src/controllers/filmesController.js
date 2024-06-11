import db from "../models/index.js";
import { pegarFilmesAPI, constroiObjetoFilme } from "../services/filmeService.js";

class filmesController {
    static async listarFilmes(req, res) {
        try {
            const filmesAPI = await pegarFilmesAPI();
            const objFilmes = [];
            for (const filme of filmesAPI) {
                const objFilme = await constroiObjetoFilme(filme);
                objFilmes.push(objFilme);
            }
            return res.status(200).json(objFilmes);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

(async () => {


})();


export default filmesController;

