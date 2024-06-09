
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

(async ()=>{
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

