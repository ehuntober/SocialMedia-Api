const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv');


const app = express();
dotenv.config()

app.use(cors());
app.use(express.json())

// Connect with MongoDB Database

mongoose.connect(process.env.MONGO_DB_URI,{
    // userNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("MongoDB connection is Successfully!!")
}).catch((err) =>{
    console.log(err.message);
})

const PORT = process.env.PORT || 9000;

app.listen(PORT,()=>{
    console.log('Express server listening on port %s', PORT);
})