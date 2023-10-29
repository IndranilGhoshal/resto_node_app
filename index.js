const express = require('express')

const app = express();
var http = require('http');
var bodyParser = require('body-parser');
const port = 8080;
router = require("./router/router")
var cros = require('cors')
var path = require('path')
app.use(cros({origin:true}));
app.options('*',cros())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var root = __dirname + "/public";
app.use(express.static(root))
app.set('views', path.join(__dirname, 'public'));

app.get('/', (req, res) => {
  res.send('Hello World!')
});
app.use('/api', router);



var httpsServer = http.createServer(app);
httpsServer.listen(port);
console.log('REST-API server started on: ' + port);






