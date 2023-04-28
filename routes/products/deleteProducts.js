const express = require("express");
const { Products } = require('../../data/models');
const { auth } = require('../../controller/auth');
const router = express.Router();

router.delete('/products/:code', auth, async (req, res, next) => {
    try {
        const { code } = req.params;

        const deletedProduct = await Products.deleteOne({ code });

        if (deletedProduct.deletedCount === 0) {
            return res.status(404).json({ message: `Produto com código ${code} não encontrado.` });
        }

        return res.json({ message: `Produto com código ${code} apagado com sucesso.` });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
