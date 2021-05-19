const express = require('express');
const router = express.Router();

const budgetController = require('../controllers/budget.controller');


// GET
router.get('/:idBudget', budgetController.findById);

router.get('/findByUser/:idUser', budgetController.findByUser);

router.get('/findByService/:idService', budgetController.findByService);


// POST
router.post('/create', budgetController.create);


// PUT
router.put('/:idBudget/update', budgetController.update);


//DELETE
router.delete('/:idBudget/delete', budgetController.delete);


module.exports = router;