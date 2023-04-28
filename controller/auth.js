const jwt = require('jsonwebtoken');
const { Users } = require('../data/models');
const { env: { JWT_SECRET } } = process;

const auth = async (req, res, next) => {
    const { authorization } = req.headers;

    try {
        if (!authorization) throw new Error("authorization inválido.");
        
        const token = authorization.slice(7);
        const { sub } = await jwt.verify(token, JWT_SECRET);

        const userFound = await Users.findById(sub);
        if (!userFound) throw new Error("O usuário não foi encontrado.");

        next(); // permite que se ejecute la proxima funcion (middleware)
    } catch (error) {
        next(error);

    }
};

module.exports = {auth};