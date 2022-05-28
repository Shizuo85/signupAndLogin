const express = require('express')
const bcrypt = require("bcrypt")
const app = express()

app.use(express.json())

const users = []

app.get("/users", (req, res)=>{
    res.json(users)
})

app.post("/users", async (req, res)=>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = {name: req.body.name, password: hashedPassword}
        users.push(newUser)
        res.status(201).json(newUser)
    } catch{
        res.status(500).send()
    }
})

app.post("/users/login", async (req, res)=>{
    const user = users.find(user => user.name == req.body.name)
    if (!user){
        return res.status(400).send("Can not find user")
    }
    try {
        console.log(req.body.password, user.password)
        if (await bcrypt.compare(req.body.password, user.password)){
            res.send("Success")
        } else{
            res.send("Not allowed")
        }

    } catch{
        res.status(500).send()
    }
})

app.listen(5050, ()=>{
    console.log("Server is listening...")
})