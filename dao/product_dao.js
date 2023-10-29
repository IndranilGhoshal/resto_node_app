const db = require('../database/db');
const common = require('../services/common');


module.exports.addProduct = (data) => {
	return new Promise((resolve, reject) => {
		try {
			var sql = "INSERT INTO `mst_product`(`productPhoto`, `name`, `categoryId`, `price`, `color`, `size`, `quantity`, `unit`) VALUES ('"+data.productPhoto+"','"+data.name+"','"+data.categoryId+"','"+data.price+"','"+data.color+"','"+data.size+"','"+data.quantity+"','"+data.unit+"')";
			db.connection.query(sql,function (err, success){
                if (err) {
                    resolve(common.errorResolve(err))
                } else {
                    resolve(success)
                }
            });
		} catch (e) {
			console.log(e);
			resolve('500');
		}
	});
}

module.exports.productList  = (data) => {
    return new Promise((resolve, reject) => {
        try {
            var sql = "SELECT mst_product.productId, mst_product.productPhoto, mst_product.name, mst_product.categoryId, mst_category.name as category_name, mst_product.price, mst_product.color, mst_product.size, mst_product.quantity, mst_product.unit FROM mst_product INNER JOIN mst_category ON mst_product.categoryId=mst_category.categoryId WHERE mst_product.isDelete = '0'";
            db.connection.query(sql,async function (err, success){
                if (err) {
                    resolve(common.errorResolve(err))
                } else {
                    resolve(success)
                }
            });
        } catch (e) {
            console.log(e);
            resolve('500');
        }
    });
}


module.exports.productListMenu= (data)=>{
    return new Promise((resolve, reject) => {
		try {
            let dsql
            if(data.categoryId!==null){
                dsql = "categoryId = '"+data.categoryId+"' AND isDelete = '0'"
            }else{
                dsql = "isDelete = '0'"
            }
			var sql = "SELECT * FROM `mst_product` WHERE "+dsql+"";
            console.log("sql", sql)
			db.connection.query(sql,async function (err, success){
                if (err) {
                    resolve(common.errorResolve(err))
                } else {
                    resolve(success)
                }
            });
		} catch (e) {
			console.log(e);
			resolve('500');
		}
	});
}