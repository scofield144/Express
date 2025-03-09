const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

// app.get('/about',(req, res)=> {
//     res.send('Welcome to About page!');
// })

let posts = [
    {id: 1, title: 'Post 1', body: 'This is post 1'},
    {id: 2, title: 'Post 2', body: 'This is post 2'},
    {id: 3, title: 'Post 3', body: 'This is post 3'}
]
app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'test')))


app.get('/api/posts',(req,res)=> {
    res.json(posts); 
})


app.listen(port,()=>{
    console.log(`Example listing on port ${port}`);
})