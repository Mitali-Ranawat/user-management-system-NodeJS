const routes = require('express').Router()
const multer  = require('multer')
const verifyAuth = require("../../../middleware/auth");

const storage = multer.diskStorage({
  destination: (req,file, cb) => {
      cb(null, './public/uploads')
  },
  filename: (req, file, cb) => {

      cb(null, file.originalname)
  }
})


const upload = multer({storage: storage})


module.exports = () => {
    routes.get('/', require('./get')())  //kind of admin view to get all user details
    routes.get('/profile', verifyAuth.verifyToken,  require('./getProfile')())
    routes.get('/:id',verifyAuth.verifyToken, require('./getOtherUser')())
    routes.post('/register', upload.single("image"), require('./register')())
    routes.post('/login', upload.single("image"), require('./login')())
    routes.put('/update', upload.single("image"), require('./update')())
    routes.put('/changepassword', verifyAuth.verifyToken, require('./changePassword')())
    return routes
}