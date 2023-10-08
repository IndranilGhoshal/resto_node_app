const express = require("express")
const bodyParser= require("body-parser")
const app = express()
const mysql = require("mysql")
const cors = require("cors")

app.use(bodyParser.json());

app.use(cors({origin:true}));
app.options("*", cors())

const conn = mysql.createConnection({
    host : "",
    user:"root",
    password:"password",
    database:"resto"
});

conn.connect((err)=>{
    if(err) throw err;
    console.log("Mysql Connected!");
})


app.post("/api/login", (request, response)=>{
    let data = {
        "email":request.body.email,
        "password":request.body.password
    }

    let sql = "SELECT *  FROM `mst_admin` WHERE `email`='"+data.email+"' AND password = '"+data.password+"' AND isDelete =0";

    let quary = conn.query(sql, (err, result)=>{
        if(err) throw err;
        if (result.err) {
            response.send(JSON.stringify({success:false,message:'Some error occurred', error:null, status:500}));
        } else {
            if (result.length==0) {
                message = 'Wrong email or password'
                response.send(JSON.stringify({success:false,message:message, error:null, status:200, result:null}));
            }else{
                let message = 'User found.'
                response.send(JSON.stringify({success:true,message:message, error:null, status:200, result:result[0]}));
            }
        }

    })
})

app.listen(8080,()=>{
    console.log("Server stared on port 8080");
})
