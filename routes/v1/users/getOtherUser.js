const userService = require('../../../services/user')

module.exports = () => {
    return (req,res) => {
        const userId = req.params.id 
        const user = userService.getUser(userId)

        const userInfo = userService.getUserInfo(userId)

        let message = ''
        if(user.length > 0) {
            message = userInfo
            

        } else {
            message = 'No user found'
        }
        res.status(200).json({
            success: true,
            message
        })
    }
}