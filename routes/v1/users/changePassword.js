const userService = require('../../../services/user')
const jwt = require("jsonwebtoken");
const config = process.env;

module.exports = () => {
    return (req,res) => {
        const token = req.headers["authorization"]
        
        const jwtToken = token.split(' ')[1]
        const decodeUserInfo = jwt.verify(jwtToken, config.TOKEN_KEY);

        const requestData = req.body

        const changedPass = userService.updatePassword(decodeUserInfo.user_id,requestData)
        
        res.status(200).json({
            success: true,
            message: 'Password changed!'
        })
    }
}

