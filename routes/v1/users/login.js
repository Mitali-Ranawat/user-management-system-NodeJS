const userService = require('../../../services/user')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const allUsers = userService.getAllUsers()



module.exports = () => {
    return async (req,res,next) => {
        console.log(req.body)
        let foundUser = allUsers.find((allUsers) => req.body.email === allUsers.email);
        if (foundUser) {
            console.log(foundUser)
            let submittedPass = req.body.password; 
            let storedPass = foundUser.password; 

            const passwordMatch =  await bcrypt.compare(submittedPass, storedPass);
            if (passwordMatch) {
                // Create token
                const token = jwt.sign(
                    { user_id: foundUser.id },
                    process.env.TOKEN_KEY,
                    {
                    expiresIn: "2h",
                    }
                );

                // save user token
                foundUser.token = token;

                let username = foundUser.name;
                res.send({
                   'token' : foundUser.token })
            }
            else {
                res.send("Invalid email or password");
            }
        }
        else {
            res.send("Invalid email")
        }
        
    }
        
}
