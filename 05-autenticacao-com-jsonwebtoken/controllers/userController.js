// Importando o service
import userService from "../services/userService.js";

// Função para CADASTRAR um Usuário
const createUser = async (req , res) => {
    try{
    // Coletando os dados do corpo da requisição
     const {name,email,password} = req.body;
     await userService.Create(name,email,password);
     res.status(201).json({sucess: "Usuário cadastrado com sucesso!"}); //Cod. 201: Created
    }catch (error){
        console.log(error);
        res.sendStatus(500); //Erro interno do servidor
    }
};
export default {createUser};