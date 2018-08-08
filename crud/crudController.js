const express = require('express');
const router = express.Router();
const Crud = require('./models/crud');
const mongoose = require('mongoose');

const crudController = {};

crudController.getCrud = (req, res, next) => {
    Crud.find().then(result => {
        res.status(200).json({
            message: 'Data get Successfully',
            data: result
        })
    })
        .then(err => {
            res.status(404).json({
                message: 'Not Found',
                error: err
            })
        })
}

crudController.getCrudBetweenDates = (req, res, next) => {
    Crud.find({
        "date": {
            $lte: req.query.enddate,
            $gte: req.query.startdate
        }
    }).then(result => {
        res.status(200).json({
            message: 'Data get Successfully',
            data: result
        })
    })
        .then(err => {
            res.status(404).json({
                message: 'Not Found',
                error: err
            })
        })
}

crudController.getOneCrud = (req, res, next) => {
    let params = {}
    if (req.query.name != null) {
        params.name = req.query.name
    }
    if (req.query.fatherName != null) {
        params.fatherName = req.query.fatherName
    }
    if (req.query.roll != null) {
        params.roll = req.query.roll
    }
    Crud.findOne(params).then(result => {
        if (result != null) {
            res.status(200).json({
                message: 'Data get Successfully',
                data: result
            })
        } else {
            res.status(404).json({
                message: 'Not such Crud Found in Db',
                data: result
            })
        }
    })
        .then(err => {
            res.status(404).json({
                message: 'Not Found',
                error: err
            })
        })
}

crudController.addCrud = (req, res, next) => {
    console.log(req.body, "body");
    if (req.body.name && req.body.fatherName && req.body.roll) {

        let tempData = {
            name: req.body.name,
            fatherName: req.body.fatherName,
            roll: req.body.roll,
            date: new Date()
        }
        const crud = new Crud(tempData);
        crud.save().then(result => {
            console.log(result, "Save name in db");
            res.status(200).json({
                message: 'Data successfully save in Db',
                data: result
            })
        })
            .catch(err => {
                console.log(err, "Error from save crud")
                res.status(400).json({
                    error: err
                })
            });
    } else {
        res.status(400).json({
            message: 'Something missing in the field',
        })
    }
}

crudController.deleteCrud = (req, res, next) => {
    let id = req.params._id;
    console.log(id, "id in Params");
    Crud.findOneAndRemove({ _id: id }).then(result => {
        res.status(200).json({
            message: 'Crud Deleted Successfully',
            data: result
        })
    })
        .then(err => {
            res.status(404).json({
                message: 'No such data found in db',
                error: err
            })
        })
}

crudController.updateCrud = (req, res, next) => {
    let id = req.params._id;
    console.log(id, "id in Params");
    Crud.findOneAndUpdate({ _id: id }, req.body).then(result => {
        res.status(200).json({
            message: 'Crud updated Successfully',
            data: result
        })
    })
        .then(err => {
            res.status(404).json({
                message: 'No such data found in db',
                error: err
            })
        })
}

crudController.filterCrud = (req, res, next) => {
    let query = req.query;
    console.log(query, "query");
    res.status(200).json({
        message: 'Crud filter Successfully',
        data: query.data
    })
    // Crud.findOneAndUpdate({ _id: id },req.body).then(result => {
    //     res.status(200).json({
    //         message: 'Crud updated Successfully',
    //         data: result
    //     })
    // })
    // .then(err => {
    //     res.status(404).json({
    //         message: 'No such data found in db',
    //         error: err
    //     })
    // })
}

crudController.getCrudWithPagination = (req, res, next) => {
    var limit = req.query.limit || 5;
    console.log(req.query, "Querry")
    var page = req.query.page || 1;
    Crud
        .find({})
        .skip((limit * page) - limit)
        .limit(limit)
        .exec((err, result) => {
            Crud.count().exec((err, count) => {
                if (err) {
                    return next(err)
                }
                else {
                    console.log(count, "COUNT")
                    res.status(200).json({
                        data: result,
                        page: page,
                        total: count,
                        pages: Math.ceil(count / limit)
                    })
                }
            })
        })
}
module.exports = crudController;