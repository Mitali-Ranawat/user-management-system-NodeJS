const routes = require('express').Router()
//const bodyParser = require('body-parser')


/*routes.use(bodyParser.urlencoded({
    extended: true
}));
routes.use(bodyParser.json());*/


module.exports = () => {
    routes.use('/user', require('./users')())
    return routes
}