const dao = require('../dao/category_dao');
const common = require('../services/common');
const express = require('express');
const router = express.Router();

module.exports = router;

router.post('/addCategory', async (req, res) => {
    try {
        if (req.body.name === undefined) {
            res.send(common.sendResponse(false, 0, 'name missing', null, 401))
        } else {
            const result = await dao.addCategory(req.body);
            if (result.error) {
                res.send(common.sendResponse(false, 0, 'Some error occurred', null, 500));
            } else {
                let message = 'Category added succesfully'
                res.send(common.sendResponse(true, 1, message, null, 0));
            }
        }
    } catch (e) {
        console.log(e)
        res.send(common.sendResponse(false, 0, 'Something went wrong. Please try again.', null, 1002));
    }
});

router.post('/categoryList', async (req, res) => {
    try {
        const result = await dao.categoryList(req.body);
        if (result.error) {
            res.send(common.sendResponse(false, 0, 'Some error occurred', null, 500));
        } else {
            let message = 'Data Found'
            res.send(common.sendResponse(true, 1, message, result, 0));
        }
    } catch (e) {
        console.log(e)
        res.send(common.sendResponse(false, 0, 'Something went wrong. Please try again.', null, 1002));
    }
});


router.post('/categoryUpdate', async (req, res) => {
    try {
        if (req.body.name === undefined) {
            res.send(common.sendResponse(false, 0, 'name missing', null, 401))
        } else {
            const result = await dao.categoryUpdate(req.body);
            if (result.error) {
                res.send(common.sendResponse(false, 0, 'Some error occurred', null, 500));
            } else {
                let message = 'Category updated succesfully'
                res.send(common.sendResponse(true, 1, message, null, 0));
            }
        }
    } catch (e) {
        console.log(e)
        res.send(common.sendResponse(false, 0, 'Something went wrong. Please try again.', null, 1002));
    }
});

router.post('/categoryDelete', async (req, res) => {
    try {
        const result = await dao.categoryDelete(req.body);
        if (result.error) {
            res.send(common.sendResponse(false, 0, 'Some error occurred', null, 500));
        } else {
            let message = 'Category deleted succesfully'
            res.send(common.sendResponse(true, 1, message, null, 0));
        }
    } catch (e) {
        console.log(e)
        res.send(common.sendResponse(false, 0, 'Something went wrong. Please try again.', null, 1002));
    }
});