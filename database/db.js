var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '',
    user: 'root',
    password: 'password',
    database: 'resto'
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

module.exports.connection = connection;