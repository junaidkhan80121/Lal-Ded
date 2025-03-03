const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRequest = require('./middleware')
const rateLimit = require('express-rate-limit');
const app = express();

app.use(cors())
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: {
        status: 429,
        message: "Too many requests from this IP, please try again after 15 minutes"
    },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(limiter);
app.use(express.json());
app.use(authRequest);

// {
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type', 'secret']
// }));


const verifyFields = (req,res,next) => {
    const fields = ["fname","lname","email","phone","query"]
    for(const i of fields){
        if(!req.body[i] || req.body[i].trim()==""){
            return res.status(401).send({"message":"Bad Input"})
        }
    }
    next();
}

app.post("/queries", (req, res) => {
    try{
        const client = req.collection;
        const {fname, lname, query, email, phone} = req.body;
        client.insertOne({"fname":fname,"lname":lname,"query":query,"email":email,"phone":phone});
        return res.status(200).send({"message":"Your Query has been received. We will respond to you r query as soon as possible"})

    }
    catch(err){
        return res.status(500).send({ message: "Internal Server Error." });    
    }
    // return res.status(200).send({ message: "Successully" });
  });


app.listen(8000, () => {
  console.log("Running on 8000");
});
