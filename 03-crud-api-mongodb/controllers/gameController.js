import gameService from "../services/gameService.js";
import { ObjectId } from "mongodb";

// Função para LISTAR jogos
const getAllgames = async (req, res) => {
  try {
    const games = await gameService.getAll();
    //Cód. 200 (OK) - Requisição feita com sucesso
    res.status(200).json({ games: games });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// Função para CADASTRAR jogos
const createGame = async (req, res) => {
  try {
    const { title, year, genre, platform, price } = req.body;
    await gameService.Create(title, year, genre, platform, price);
    res.sendStatus(201); // Código 201 (CREATED) : Recurso criado
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// Função para DELETAR jogos
const deleteGame = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      await gameService.Delete(id);
      res.sendStatus(204);
    } else {
      res.status(400).json({ error: "A ID enviada é inválida" });
      //Código 400 (BAD REQUEST) - Requisição mal formada
    }
    // Código 204 (NO CONTENT) - Requisição bem sucedida, mas não há conteúdo para retornar
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });

    // res.status(500).json({}) -> Para enviar json junto
    // res.sendStatus(500) -> Somente código de status
  }
};

// Função para ALTERAR jogos
const updateGame = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const { title, year, genre, platform, price } = req.body;
      await gameService.Update(id, title, year, genre, platform, price);
      res.sendStatus(200); //código 200 (ok)
    } else {
      res.sendStatus(400); // código 400 (bad request)
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

export default { getAllgames, createGame, deleteGame, updateGame };
