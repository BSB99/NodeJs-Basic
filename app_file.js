const express = require("express");
const app = express();
const fs = require('fs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', './views_file');
app.set('view engine', 'jade');

app.get('/topic/new', (req, res) => {
    res.render('new');
});

// app.get('/topic/:id', (req, res) => {
//     let id = req.params.id;
//     fs.readdir('data', (err, files) => {
//         if(err) {
//             console.log(err);
//             res.status(500).send('Internal Server Error');
//         };
//         fs.readFile('data/'+id, 'utf8', (err, data) => {
//             if(err) {
//                 console.log(err);
//                 res.status(500).send('Internal Server Error');
//             };
//             res.render('view', {topics:files, title:id, description:data});
//         });
//     });
// });

app.get(['/topic', '/topic/:id'], (req, res) => {
    fs.readdir('data', (err, files) => {
        if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        };
        let id = req.params.id;
        if(id){
            fs.readFile('data/'+id, 'utf8', (err, data) => {
                if(err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                };
                res.render('view', {topics:files, title:id, description:data});
            });
        } else {
        res.render('view', {topics:files, title:'Welcome', description:'Hello, JavaScript for Server'});
        };
    });
});

app.post('/topic', (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    fs.writeFile('data/'+ title, description, (err) => {
        if(err){
            console.log(err);
            res.status(499).send('Internal Server Error');
        };
        res.redirect('/topic/'+title);
    });
});

app.listen(3000, () => {
    console.log('Connected, 3000 Port');
});