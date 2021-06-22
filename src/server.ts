import express from "express"

const app = express()

app.get('/teste', (req,res)=>{
   return res.send('alo!')
})

app.post('/teste-post', (req ,res)=>{
    return res.send('post!')
})
app.listen(3000, ()=> console.log("hi!!"))