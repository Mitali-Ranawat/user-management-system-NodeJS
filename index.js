const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const routesController = require('./routes/v1')()
const userService = require('./services/user')

const app = express()
const port = process.env.PORT || 8000

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.listen(port , () => {
    console.log('Server has started and it is listening on PORT : ',port)
})

app.use('/api/v1' , routesController)




