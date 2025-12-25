const express = require("express")
const app =express()

//template engine
app.set('view engine','ejs')
app.get('/',(req,res)=>{
    res.send("hello server")
})

//route parameter
app.get('/user/:userid',(req,res)=>{
    res.send(req.params)

})

//route query
app.get('/search',(req,res)=>{
    const age=req.query.age
    res.send(`age is ${age}`)
})
app.get('/about',(req,res)=>{
    res.render("about",{tittle:'about page',message:'welcome to the page'})
})
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})