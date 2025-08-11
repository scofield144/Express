// const express = require('express');
// const app = express();
// const path = require('path');
// const port = process.env.PORT || 3000;

// // app.get('/about',(req, res)=> {
// //     res.send('Welcome to About page!');
// // })

// let posts = [
//     {id: 1, title: 'Post 1', body: 'This is post 1'},
//     {id: 2, title: 'Post 2', body: 'This is post 2'},
//     {id: 3, title: 'Post 3', body: 'This is post 3'}
// ]
// app.use(express.static(path.join(__dirname,'public')))
// app.use(express.static(path.join(__dirname,'test')))

// const users = [
//     { id: 1, name: 'Alice' },
//     { id: 2, name: 'Bob' },
//     { id: 3, name: 'Charlie' },
//     { id: 4, name: 'David' },
//     { id: 5, name: 'Eve' }
//   ];

// app.get('/api/posts/:id',(req,res)=> {
//     const id = req.params.id;
//     const post = posts.find(post => post.id === parseInt(id));
//     if(!post) res.status(404).send(`The post with the given ID was not found, ${id}`);
//     res.send(post);
//     // res.json(posts); 
// })


// // app.use((req,res,next)=> {
// //     res.status(404).send("Sorry can't find that!")    
// // })

// // learning about params

// // app.get('/api/posts/:id',(req,res)=> {
// //     const post = posts.find(post => post.id === parseInt(req.params.id));
// //     if(!post) res.status(404).send('The post with the given ID was not found');
// //     res.send(post);
// // })

// // app.get('/user/:id',(req, res)=>{
// //     const id = req.params.id;
// //     if(id ==="admin") {
// //         res.send('Welcome Admin');
// //     }else {
// //         res.send(`Welcome User ${id}`);
// //     }
    
// // })

// // app.get('/user/:user', (req,res)=>{
// //     res.send('user ' + req.user.name);
// // });

// app.get('/users/:from-:to',(req,res)=>{
//     let from = req.params.from;
//     let to = req.params.to;
//     let names = users.map(function(user){
//         return user.name;
//     });
//     res.send('users '+ names.slice(from, to + 1).join(', '));
// });

// app.listen(port,()=>{
//     console.log(`Example listing on port ${port}`);
// })