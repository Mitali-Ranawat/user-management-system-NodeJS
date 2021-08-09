const userService = require('../../../services/user')
const jwt = require("jsonwebtoken");
const config = process.env;

module.exports = () => {
    return (req,res) => {
        const token = req.headers["authorization"]
        const jwtToken = token.split(' ')[1]
        const decodeUserInfo = jwt.verify(jwtToken, config.TOKEN_KEY);
    
        res.status(200).json({
            success: true,
            profile: userService.getUserInfo(decodeUserInfo.user_id)
        })
    }
}
