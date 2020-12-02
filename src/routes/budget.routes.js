const express = require('express');
const router = express.Router();

const budgetController = require('../controllers/budget.controller');

router.get('/', budgetController.find);

router.post('/create', budgetController.create);

router.put('/update/:id', budgetController.update);

router.delete('/delete/:id', budgetController.delete);

module.exports = router;