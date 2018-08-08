const express = require('express');
const router = express.Router();
const crudController = require('../crudController')

router.post('/crud/add',crudController.addCrud);
router.get('/crud/get',crudController.getCrud);
router.get('/crud/getOne',crudController.getOneCrud);
router.delete('/crud/delete/:_id',crudController.deleteCrud);
router.put('/crud/update/:_id',crudController.updateCrud);
router.get('/crud/filter/',crudController.filterCrud);
router.get('/crud/getWithPagination',crudController.getCrudWithPagination);
router.get('/crud/getBetweenDates',crudController.getCrudBetweenDates);





module.exports = router;
