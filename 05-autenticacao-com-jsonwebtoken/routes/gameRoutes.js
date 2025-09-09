import express from "express";
const gameRoutes = express.Router();
import gameController from "../controllers/gameController.js";
// Importando o MIDDLEWARE
import Auth from "../middleware/Auth.js"; 

// A camada de routes será responsável por conter os ENDPOINTS da API

//ENDPOINT para LISTAR
gameRoutes.get("/games", Auth.Authorization,gameController.getAllgames);

// ENDPOINT para CADASTRAR
gameRoutes.post("/games", Auth.Authorization, gameController.createGame);

// ENDPOINT para DELETAR
gameRoutes.delete("/games/:id", Auth.Authorization, gameController.deleteGame);

// ENDPOINT para ALTERAR
gameRoutes.put("/games/:id", Auth.Authorization, gameController.updateGame);

// ENDPOINT para LISTAR um ÚNICO JOGO
gameRoutes.get("/games/:id", Auth.Authorization, gameController.getOneGame);

export default gameRoutes;
