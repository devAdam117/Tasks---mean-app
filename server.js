const express = require("express");
const path = require("path");
const app = express();
const api = require("./server/routes/api");
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "dist/client")))
app.use(express.urlencoded({extended: true}));
app.use(express.json()) 

app.use('/api',api);
app.get("*",(req,res)=>{
    res.sendFile((path.join(__dirname, "dist/client/index.html")))
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}️‍ 🔥🔥🔥`)
})