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

    return res.status(200).send(result)
})

app.get("/:id", async(req,res)=>{
    const id = req.params.id;
    
    if(!id){
        return res.status(400).send("Please Enter id")
    }

    const result = await User.findOne({'id' : id})
    return res.status(200).send(result);

})


app.post("/add" , async(req,res)=>{
    const data = req.body ;
    const result = await User.create(data);

    console.log(`User ${data.first_name} ${data.last_name} was added`)
    return res.status(200).send(result);
})

app.put("/edit", async(req,res)=>{
    const userId = req.body.id
    const data = req.body

    const result = await User.updateOne(
        {
            id : userId
        },
        {
            $set:{
                id: data.id,
                first_name : data.first_name,
                last_name : data.last_name,
                level : data.level
            }
        }
    )

    console.log(`Data update on ${userId}`)
    return res.status(200).send(result)
})

app.delete('/delete', async(req,res)=>{
    const id = req.body.id;

    if(!id){
        return res.status(400).send("Please Enter id")
    }

    const result = await User.deleteOne({'id': id})

    console.log(`USER ${id} was deleted`)
    return res.status(200).send(result);

})

const PORT = process.env.PORT || 3000 ;
app.listen(PORT , ()=>console.log(`Server is running on port ${PORT}`))