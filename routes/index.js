const express = require('express');
const router = express.Router();

const getProducts = require('./products/getProducts.js');
const postProducts = require('./products/postProducts.js')
const deleteProducts = require('./products/deleteProducts.js')
const updateProducts = require('./products/updateProducts.js')

const postUsers = require('./users/postUsers.js');


router.use(getProducts);
router.use(postProducts);
router.use(deleteProducts);
router.use(updateProducts);

router.use(postUsers);

module.exports = router;
