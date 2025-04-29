const express = require('express');
const controller = require('../controllers/laf.controller');

const router = express.Router();

router.get('/get_lost_and_found', controller.get_lost_and_found);
router.post('/add_lost_and_found', controller.add_lost_and_found);
router.post('/delete_from_lost_found', controller.delete_from_lost_and_found);

// removing these later
router.post('/post_found', controller.post_found);
router.post('/post_lost', controller.post_lost);

// not implemented
router.get('/get_lost_and_found/:id', controller.get_lost_and_found_by_id);
router.delete('/delete_from_lost_and_found/:id', controller.delete_from_lost_and_found_by_id);
router.patch('/update_lost_and_found/:id', controller.update_lost_and_found);

module.exports = router
