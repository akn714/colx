const express = require('express');
const controller = require('../controllers/olx.controller');

const router = express.Router();

router.get('/fetch_products', controller.fetch_products);
router.post('/post_product', controller.post_product);

// not implemented
router.patch('/set_sold', controller.set_sold);
router.get('/get_product/:id', controller.get_product);
router.delete('/delete_product/:id', controller.delete_product);
router.patch('/update_product/:id', controller.update_product);

module.exports = router


