const bcrypt = require('bcrypt');
const data = require('../data');
const allUsers = data.allUsers


const getAllUsers = () => {
    return allUsers
} 

const getUser = (id) => {
    const user = allUsers.filter((eachUser) => eachUser.id == id)
    return user
}

const getUserInfo = (id) => {
    const user = allUsers.filter((eachUser) => eachUser.id == id)
    const userInfo = {"name": user[0].name ,"email": user[0].email , "mobile": user[0].mobile , "profile": user[0].profile}
    return userInfo
}

const insertUser = async (requestData,image) => {
 
    let foundUser = allUsers.find((allUsers) => requestData.email === allUsers.email);
    if (!foundUser) {

        let hashPassword = await bcrypt.hash(requestData.password, 10);

        let newUser = {
            id: Date.now(),
            name: requestData.name,
            email: requestData.email,
            password: hashPassword,
            mobile: requestData.mobile,
            profile : image

        };
        allUsers.push(newUser);
        console.log('User list', allUsers);
        return 
        
    }
    
}

const updateUser = async (id,requestData,image) => {
 
    let foundUser = allUsers.find((allUsers) => id === allUsers.id);
    if (foundUser) {
      
        foundUser.name = requestData.name,
        foundUser.email = requestData.email,
        foundUser.mobile = requestData.mobile,
        foundUser.profile  = image

        console.log('User list', allUsers);
        return   

    }
    else {
        return('User not found')
    }
    
}

const updatePassword = async (id,requestData) => {
 
    let foundUser = allUsers.find((allUsers) => id === allUsers.id);
    if (foundUser) {

        let oldPass = requestData.oldpassword; 
        let storedPass = foundUser.password; 

        const passwordMatch =  await bcrypt.compare(oldPass, storedPass);
        if(passwordMatch){
            let hashPassword = await bcrypt.hash(requestData.newpassword, 10);
            foundUser.password = hashPassword
            return ('Password updated')  
        }
        else {
            return("Invalid")
        }     
    } 
}



module.exports = {
    getAllUsers,
    getUser,
    getUserInfo,
    insertUser,
    updateUser,
    updatePassword
    
}