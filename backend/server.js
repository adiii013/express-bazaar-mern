const app = require("./app")
const dotenv = require("dotenv")
const connectDatabase = require("./config/database")

//Handling uncaught exception

process.on("uncaughtException",err=>{
    console.log(`Error: ${err.message}`)
    console.log("Shutting down server due to uncaught exception")
    process.exit(1)
    
})


//config
dotenv.config({path:"./backend/config/config.env"})

//Connecting to database
connectDatabase()


const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is running at http://localhost:${process.env.PORT}`)
})

// unhandled Promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`)
    console.log("Shutting down server due to unhandled Rejection")
    server.close(()=>{
        process.exit()
    })
})