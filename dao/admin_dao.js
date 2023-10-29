const db = require('../database/db');
const common = require('../services/common');

module.exports.login = (data) => {
	return new Promise((resolve, reject) => {
		try {
            console.log(data)
			var sql 	=	"SELECT *  FROM `mst_admin` WHERE `email`='" + data.email + "' AND password = '" + data.password + "' AND isDelete =0";
			db.connection.query(sql,function (err, success){
                if (err) {
                    resolve(common.errorResolve(err))
                } else {
                    console.log(success)
                    resolve(success)
                }
            });
		} catch (e) {
			console.log(e);
			resolve('500');
		}
	});
}