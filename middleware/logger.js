const fs = require("fs")


const saveLogToDb = (data) => {
    return new Promise((resolve, reject) => {
        fs.appendFile("./model/logs.txt", data, (error) => {
            if(error){
                reject("Error writing file")
            }
            else{
                resolve("file writen successfully")
            }

        })
        
    })
}


const logger = (req, res, next)=> {
    const date = new Date()
    const convertedDate = date.toLocaleString()

    const data = `API endpoint: ${req.url} and method ${req.method} was called at ${convertedDate}`
    saveLogToDb(data)
    next()
}

module.exports = logger
