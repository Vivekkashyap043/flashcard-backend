const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()

const port = process.env.PORT || 8000

const connection = require("./connection")
const ApiRoutes = require("./ApiRoutes")

const app = express()

app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true})); 
app.use(cors())

// Connecting to database
connection.connect( (err) => {
    if (err) {
        console.log("Error in the connection")
        console.log(err)
    }
    else {
        console.log(`Database Connected`)
    }
})

app.use("/flashcard", ApiRoutes);

app.listen(port, () => {
    console.log("server is running on port number 8000")
})