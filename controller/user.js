const database = require("../model/database.json");
const fs = require("fs");



const saveToDb = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile("./model/database.json", data, (error)=>{
            if (error){
                reject(error)
            }
            else{
                resolve("file written successfully")
            }
        })
    })
}
//saveToDb("naomi is confused").then((data) => console.log(data)).catch((error)=> console.log(error))

// to get all the user in the database
const allusers = (req, res)=> {
    const users = database;

    res.status(200).json({data: users})

}


const newUser = async(req, res)=> {
    const {name, gender} = req.body;
    const id = database.length + 1;


    const user = {
        id: id,
        name,
        gender
    }

    database.push(user)
    await saveToDb(JSON.stringify(database, null , 2))
    res.status(201).json({message: "user created successfully", data: user})
}

// to get a single user
const getOneUser = (req, res)=> {
    const id = Number(req.params.id)
    const user = database.find((user)=> user.id === id)

    if (user === null){
        res.status(404).json({message:"user not found"})
    }

    res.status(200).json({data: user})
}

// to update a user
const updateUser = async(req, res)=>{
    const id = Number(req.params.id)

    const user = database.find((user)=> user.id === id)

    if (user === null){
        res.status(404).json({message:"user not found"}) 
    }

    const name = req.body.name;
    const gender = req.body.gender;

    user.name = name || user.name;
    user.gender = gender || user.gender;


    await saveToDb(JSON.stringify(database, null, 2))
    res.status(200).json({message: "user successfully updated", data: user})
}

// to delete a user
const deleteUser = async(req, res)=>{
    const id = Number(req.params.id)
    const userIndex = database.findIndex((user)=> user.id === id)

    if (userIndex === -1){
        res.status(404).json({message:"user not found"})
    }

    database.splice(userIndex, 1)
    await saveToDb(JSON.stringify(database, null , 2))
    res.status(200).json({message: "user successfully deleted"})
}

module.exports = {
    allusers,
    newUser,
    getOneUser,
    updateUser,
    deleteUser
}