const express = require('express');
const common = require('../services/common')
const router = express.Router();

const admin = require('../controller/admin_controller')
const category = require('../controller/category_controller')
const product = require('../controller/product_controller')

router.use('/admin', admin );
router.use('/category', category );
router.use('/product', product );

router.post('/upload',async (req,res)=>{
    try{
        const result = await common.uploadFile(req);
        res.send(result)
    }catch(e){
        console.log(e);
        res.send({'success':false,"massage":"File not uploaded"})
    }
})


module.exports = router;