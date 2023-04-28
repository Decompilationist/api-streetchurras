const express = require('express');
const { Products } = require('../../data/models');
const validate = require('../../controller/validate');
const { auth } = require('../../controller/auth');
const router = express.Router();

// Rota para editar um produto existente
router.put('/products/:code', auth, async (req, res, next) => {
  const { code } = req.params;
  const { SKU, name, description, pictures, price, currency } = req.body;

  try {
    // Validação dos parâmetros de entrada
    validate.argumentsValidate([
      { keyName: 'SKU', value: SKU, type: 'string', notEmpty: true },
      { keyName: 'name', value: name, type: 'string', notEmpty: true },
      { keyName: 'description', value: description, type: 'string', notEmpty: true, optional: true },
      { keyName: 'pictures', value: pictures, type: 'array', notEmpty: true },
      { keyName: 'price', value: price, type: 'number', notEmpty: true },
      { keyName: 'currency', value: currency, type: 'string', notEmpty: true },
    ]);

    // Busca o produto pelo código e atualiza os dados
    const product = await Products.findOneAndUpdate(
      { code },
      { SKU, name, description, pictures, price, currency },
      { new: true } // Retorna o documento atualizado
    );

    if (!product) {
      throw new Error(`Produto com código ${code} não encontrado`);
    }

    return res.json(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
