const db = require('../database/db');
const common = require('../services/common');


module.exports.addCategory = (data) => {
	return new Promise((resolve, reject) => {
		try {
			var sql = "INSERT INTO `mst_category`(`name`) VALUES ('" + data.name + "')";
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

module.exports.categoryList  = (data) => {
	return new Promise((resolve, reject) => {
		try {
			var sql = "SELECT * FROM `mst_category` WHERE isDelete = '0'";
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

module.exports.categoryUpdate  = (data) => {
	return new Promise((resolve, reject) => {
		try {
			var sql = "UPDATE `mst_category` SET `name`='"+data.name+"' WHERE `categoryId` = '"+data.categoryId+"' AND  `isDelete` = '0'";
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


module.exports.categoryDelete  = (data) => {
	return new Promise((resolve, reject) => {
		try {
			var sql = "UPDATE `mst_category` SET `isDelete`='1' WHERE `categoryId` = '"+data.categoryId+"'";
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