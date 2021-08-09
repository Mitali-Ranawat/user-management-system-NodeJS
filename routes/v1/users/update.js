const userService = require('../../../services/user')
const multer  = require('multer')
const config = process.env
const jwt = require("jsonwebtoken")

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

        const token = req.headers["authorization"]
        const jwtToken = token.split(' ')[1]
        const decodedUserInfo = jwt.verify(jwtToken, config.TOKEN_KEY);
    
    
        const requestData = req.body
        const image = req.file.originalname
        
        const user = userService.updateUser(decodedUserInfo.user_id,requestData,image)
    
    
        res.status(200).json({
            success: true,
            message: 'User updated '
        })
    }
}