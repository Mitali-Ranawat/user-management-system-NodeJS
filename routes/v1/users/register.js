const userService = require('../../../services/user')
const multer  = require('multer')
const jwt = require("jsonwebtoken");

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
    return (req,res,next) => {

      const requestData = req.body
      const image = req.file.originalname
      const name = requestData.name
      const email = requestData.email
      
      const user = userService.insertUser(requestData,image)
      
      
      res.status(200).json({
          success: true,
          message: 'User inserted'
      })
    }
}