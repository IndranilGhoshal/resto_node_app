const formidable = require('formidable');
const fs = require('fs');
var root = "./public/images";

module.exports.errorResolve = (err) => {
    return { error: err };
}

module.exports.successResolve = (data) => {
    return { error: null, result: data };
}

module.exports.sendResponse = (success = true, status = 200, message = '', response = null, error = 0) => {
    if (response) {
        return {
            status: status,
            success: success,
            error: error,
            message: message,
            response
        }
    }
    return {
        status: status,
        success: success,
        error: error,
        message: message
    }
}

module.exports.uploadFile = (req) => {
    return new Promise((resolve, reject) => {
        const from = new formidable.IncomingForm({multiples:true,uploadDir:root})
        let fileName = '';
        from.on('file',function(field,file){
            const timestamp = new Date().getTime();
            let fileExplode = file.originalFilename.split('.')
            fileName = fileExplode[0]+'_'+timestamp+'.'+fileExplode[1]
            fs.rename(file.filepath,from.uploadDir+"/"+fileName,(err)=>{
                console.log('File Error >>',err)
            })
        })
        from.parse(req,(err,fields,files)=>{
            data ={"success":true,"fileName":fileName}
            resolve(data);
        })
    });
}