var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require('fs');

var app = express();
var port = process.env.PORT || 8081;

app.use(express.urlencoded({ extended:false }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    fs.readFile('data.json', (err, db) => {
        if(err) {
            console.log('get root error: ', err);
            res.status(500).send('something went worong');
            return;
        }
        let tasks = JSON.parse(db);
        res.send(tasks);
    })
});


app.post('/addTodo', (req, res) => {
    var { name } = req.body;
    fs.readFile('data.json' , (err, db) => {
        if(err){
            console.log('error', err);
        }
        let tasks = JSON.parse(db);
        if(name){ 
            tasks.push({name: name});
            res.json('successful');
        }
        fs.writeFile('data.json', JSON.stringify(tasks, null, 2), err => {
            if(err){console.log(err);}
        });
    })
})

app.post('/removeTodo', (req, res) => {
    var { index } = req.body;
    fs.readFile('data.json' , (err, db) => {
        if(err){
            console.log('error', err);
        }
        let tasks = JSON.parse(db);
        res.send(tasks);
        tasks.splice(index, 1);
        fs.writeFile('data.json', JSON.stringify(tasks, null, 2), err => {
            if(err){console.log(err);}
        });
    })
})

app.post('/editTodo', (req, res) => {
    var { index, name } = req.body;
    fs.readFile('data.json' , (err, db) => {
        if(err){
            console.log('error', err);
        }
        let tasks = JSON.parse(db);
        if(name){ 
            tasks[index].name = name;
            res.json('successful');
        }
        fs.writeFile('data.json', JSON.stringify(tasks, null, 2), err => {
            if(err){console.log(err);}
        });
    })
})
app.listen(port, () => {
    console.log(`app running on port http://localhost:${port}`);
});