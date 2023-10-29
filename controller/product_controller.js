const dao = require('../dao/product_dao');
const common = require('../services/common');
const express = require('express');
const router = express.Router();

module.exports = router;

router.post('/addProduct', async (req, res) => {
    try {
        if (req.body.productPhoto === undefined || req.body.name === undefined || req.body.categoryId === undefined|| req.body.price === undefined|| req.body.color === undefined|| req.body.size === undefined || req.body.quantity === undefined|| req.body.unit === undefined) {
            res.send(common.sendResponse(false, 0, 'data missing', null, 401))
        } else {
            const result = await dao.addProduct(req.body);
            if (result.error) {
                res.send(common.sendResponse(false, 0, 'Some error occurred', null, 500));
            } else {
                let message = 'Product added succesfully'
                res.send(common.sendResponse(true, 1, message, null, 0));
            }
        }
    } catch (e) {
        console.log(e)
        res.send(common.sendResponse(false, 0, 'Something went wrong. Please try again.', null, 1002));
    }
});

router.post('/productList', async (req, res) => {
    try {
        const result = await dao.productList(req.body);
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


router.post('/productListMenu', async (req, res) => {
    try {
        const result = await dao.productListMenu(req.body);
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