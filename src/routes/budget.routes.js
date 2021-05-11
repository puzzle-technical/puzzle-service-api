const express = require('express');
const router = express.Router();

const budgetController = require('../controllers/budget.controller');

router.get('/', budgetController.find);

router.get('/findByService/:idService', budgetController.findByService);

router.get('/findByUser/:idUser', budgetController.findByUser);

router.post('/create', budgetController.create);

router.put('/update/:idBudget', budgetController.update);

router.delete('/delete/:idBudget', budgetController.delete);

module.exports = router;