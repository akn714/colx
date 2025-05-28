const express = require('express');
const controller = require('../controllers/olx.controller');
const { authorizeUser } = require('../utils');

const router = express.Router();

router.get('/fetch_products', controller.fetch_products);
router.get('/get_product/:id', controller.get_product);

router.use(authorizeUser);

router.post('/post_product', controller.post_product);
router.patch('/set_sold/:id', controller.set_sold);
router.delete('/delete_product/:id', controller.delete_product);
router.patch('/update_product/:id', controller.update_product);

module.exports = router


