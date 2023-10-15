const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const mysql = require("mysql")
const cors = require("cors")

app.use(bodyParser.json());

app.use(cors({ origin: true }));
app.options("*", cors())


const successTrue = true;
const successFalse = false;
const ErrorResult = "Some Error occurred"
const DataAddedSuccessMessage = "Data Successfully Added"
const DataUpdatedSuccessMessage = "Data Update Successfully"
const DataAddedNotSuccessMessage = "Data Not Successfully Added"
const DataDeletedNotSuccessMessage = "Data Delete Successfully "



const conn = mysql.createConnection({
    host: "",
    user: "root",
    password: "password",
    database: "resto"
});

conn.connect((err) => {
    if (err) throw err;
    console.log("Mysql Connected!");
})


app.post("/api/login", (request, response) => {
    let data = {
        "email": request.body.email,
        "password": request.body.password
    }

    let sql = "SELECT *  FROM `mst_admin` WHERE `email`='" + data.email + "' AND password = '" + data.password + "' AND isDelete =0";

    let quary = conn.query(sql, (err, result) => {
        if (err) throw err;
        if (result.err) {
            response.send(JSON.stringify({ success: false, message: 'Some error occurred', error: 1, status: 500 }));
        } else {
            if (result.length == 0) {
                message = 'Wrong email or password'
                response.send(JSON.stringify({ success: false, message: message, error: null, status: 200, result: null }));
            } else {
                let message = 'User found.'
                response.send(JSON.stringify({ success: true, message: message, error: null, status: 200, result: result[0] }));
            }
        }

    })
})



app.post("/api/addCategory", (request, response) => {
    let data = {
        "name": request.body.name
    }
    let sql = "INSERT INTO `mst_category`(`name`) VALUES ('" + data.name + "')"

    let quary = conn.query(sql, (error, result) => {
        if (result.error) {
            response.send(JSON.stringify({ "success": successFalse, message: ErrorResult, error: 1, status: 500 }))
        } else {
            response.send(JSON.stringify({ "success": successTrue, message: DataAddedSuccessMessage, error: null, status: 200 }))
        }
    })
})


app.post("/api/categoryList", (request, response) => {
    let data = {
        "name": request.body.name
    }
    let sql = "SELECT * FROM `mst_category` WHERE isDelete = '0'"

    let quary = conn.query(sql, (error, result) => {
        if (result.error) {
            response.send(JSON.stringify({ "success": successFalse, message: ErrorResult, error: 1, status: 500 }))
        } else {
            response.send(JSON.stringify({ "success": successTrue, message: DataAddedSuccessMessage, error: null, status: 200, result:result }))
        }
    })
})


app.post("/api/categoryUpdate", (request, response) => {
    let data = {
        "name": request.body.name,
        "categoryId": request.body.categoryId
    }
    let sql = "UPDATE `mst_category` SET `name`='"+data.name+"' WHERE `categoryId` = '"+data.categoryId+"' AND  `isDelete` = '0'"

    let quary = conn.query(sql, (error, result) => {
        if (result.error) {
            response.send(JSON.stringify({ "success": successFalse, message: ErrorResult, error: 1, status: 500 }))
        } else {
            response.send(JSON.stringify({ "success": successTrue, message: DataUpdatedSuccessMessage, error: null, status: 200 }))
        }
    })
})


app.post("/api/categoryDelete", (request, response) => {
    let data = {
        "categoryId": request.body.categoryId
    }
    let sql = "UPDATE `mst_category` SET `isDelete`='1' WHERE `categoryId` = '"+data.categoryId+"' "

    let quary = conn.query(sql, (error, result) => {
        if (result.error) {
            response.send(JSON.stringify({ "success": successFalse, message: ErrorResult, error: 1, status: 500 }))
        } else {
            response.send(JSON.stringify({ "success": successTrue, message: DataDeletedNotSuccessMessage, error: null, status: 200 }))
        }
    })
})



app.listen(8080, () => {
    console.log("Server stared on port 8080");
})
