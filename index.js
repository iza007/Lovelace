const express = require('express')
const cookie = require('cookie-parser');
const fs = require('fs');
const path = require('path');
require('./users_functions.js')();

const port = process.env.PORT || 8000;

const app = express()
app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookie());
require('./routes/main')(app);


app.set('view engine', 'hbs')

const handler = (req, res) => res.send(path.join(__dirname, "/index.js"))
const routes = ["/test", "/register", "/rooms", "/treatments"]
routes.forEach( route => app.get(route, handler) )



app.listen(port);
console.log("Server running...")
