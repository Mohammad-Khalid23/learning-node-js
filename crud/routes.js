const express = require('express');
const router = express.Router();
const crudController = require('./crudController')

router.post('/add',crudController.addCrud);
router.get('/get',crudController.getCrud);
router.get('/getOne',crudController.getOneCrud);
router.delete('/delete/:_id',crudController.deleteCrud);
router.put('/update/:_id',crudController.updateCrud);
router.get('/filter/',crudController.filterCrud);
router.get('/getWithPagination',crudController.getCrudWithPagination);
router.get('/getBetweenDates',crudController.getCrudBetweenDates);
router.get('/getSortCrud',crudController.getSortCrud);






module.exports = router;
