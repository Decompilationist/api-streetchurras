const express = require('express');
const jwt = require('jsonwebtoken');
const { env: { JWT_SECRET } } = process;
const { Users } = require('../../data/models');
const router = express.Router();
const crypto = require('crypto');

// cadastrar usuario

router.post('/users/register', async (req, res, next) => {
    const { email, username, password } = req.body;

    try {
        //validações de email, username e password aqui
        const emailExists = await Users.exists({ email });
        if (emailExists) {
            throw new Error("O email já está cadastrado");
        }

        // Verificar se o nome de usuário já está cadastrado
        const usernameExists = await Users.exists({ username });
        if (usernameExists) {
            throw new Error("O nome de usuário já está cadastrado");
        }

        // Verificar se a senha é forte o suficiente (exemplo de validação)
        if (password.length < 8) {
            throw new Error("A senha deve ter pelo menos 8 caracteres");
        }
        //criando uma instância do modelo Users com os dados do usuário a ser cadastrado
        const newUser = new Users({ email, username, password });

        //salvando o novo usuário no banco de dados
        await newUser.save();

        //enviando a resposta com o novo usuário criado
        return res.json({ user: newUser });
    } catch (error) {
        next(error);
    }
})



// logar usuario
router.post('/users/login', async (req, res, next) => {
    const { email, username, password } = req.body;
    
    try {
        //userLoginValidation(email, password);

        const user = await Users.findOne({$or:[{email},{username}]});

        if (!user){
            throw new Error (`O usuário não está registrado.`)} 

            const isPasswordValid = await user.checkPassword(password);

            if (!isPasswordValid) {
                throw new Error("Senha incorreta");
            }

        // if(user.role !== "admin" || user.active !== true) throw new Error (`O usuário não tem permissões para logar.`);
        
        
        const token = await jwt.sign({ sub: user._id }, JWT_SECRET, { expiresIn: "12h"});

        return res.json({ token, user: user });                
    } catch (error){
        next(error);
    }
})

module.exports = router;