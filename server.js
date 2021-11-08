const express = require('express');
const mongoose = require('mongoose')
const app = express();
const User = require('./models/user');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use( (req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers","X-Requested-With,content-type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
})

mongoose.connect('mongodb://localhost:27017/mydb');

app.get("/", async(req,res)=>{
    const result = await User.find({});

    res.status(200).send(result)
})

app.post("/add" , async(req,res)=>{
    const data = req.body ;
    const result = await User.create(data);

    console.log(`User ${data.first_name} ${data.last_name} was added`)
    res.status(200).send(result);
})


const PORT = process.env.PORT || 3000 ;
app.listen(PORT , ()=>console.log(`Server is running on port ${PORT}`))