// Importando o service
import userService from "../services/userService.js";
// Importando o JWT
import jwt from 'jsonwebtoken';

// Importando dotenv (variáveis de ambiente)
import dotenv from "dotenv";
dotenv.config();

// Segredo para o token (é recomendado que o segredo estaja nas variáveis do ambiente)
const JWTSecret = process.env.JWTSecret;

// Importando o bcrypt (para fazer o hash de senha)
import bcrypt from "bcrypt";

// Função para CADASTRAR um Usuário
const createUser = async (req , res) => {
    try{
    // Coletando os dados do corpo da requisição
     const {name,email,password} = req.body;
    
    // VERIFICA SE O USUÁRIO JÁ EXISTE
     const user = await userService.getOne(email);
    // SE NÃO HOUVER USUÁRIO JÁ CADASTRADO
     if (user == undefined){
        // AQUI SERÁ FEITO O HASH DA SENHA
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password,salt)
     // Cadastrando o usuário
     await userService.Create(name,email,hash);
     res.status(201).json({sucess: "Usuário cadastrado com sucesso!"}); //Cod. 201: Created
     // SE O USUÁRIO JÁ ESTEJA CADASTRADO.
     } else {
        res.status(409).json({error: "O usuário informado já está cadastrado."})
        // Cod. 409: Conflict
     }    
    }catch (error){
        console.log(error);
        res.sendStatus(500); //Erro interno do servidor
    }
};

// FUNÇÃO para realizar o LOGIN
const loginUser = async(req,res) =>{
    try{
        const {email, password} = req.body
        // Buscando o usuário pelo e-mail
        const user = await userService.getOne(email);
        // Se o usuário for encontrado
        if (user != undefined) {
        // Fizendo a validação da senha(SENHA CORRETA)

        // Comparando o hash de senha
        const correct = bcrypt.compareSync(password, user.password)
        // Se a senha for válida
         if (correct){
            // Gerando o token com JWT
            jwt.sign({id: user.id, email: user.email}, JWTSecret,{expiresIn: '48h'}, (error, token) => {
                if (error){
                    res.status(400).json({error: 'Não foi possível gerar o token de autenticação.'})
                }else {
                    //Token gerado com sucesso
                    res.status(200).json({token})
                }
            });
            // SENHA INCORRETA
        }else {
            res.status(401).json({error: 'Credenciais inválidas!'})
            // Cod. 401: UNAUTHORIZED
        }    
        } else {
            res.status(404).json({ error: "Usuário não encontrado!"});
        }
    }catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
export default {createUser, loginUser, JWTSecret};