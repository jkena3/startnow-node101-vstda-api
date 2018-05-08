const express = require('express');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const data = [
    {
        todoItemId: 0,
        name: 'an item',
        priority: 3,
        completed: false
    },
    {
        todoItemId: 1,
        name: 'another item',
        priority: 2,
        completed: false
    },
    {
        todoItemId: 2,
        name: 'a done item',
        priority: 1,
        completed: true
    }
];

const app = express();


//middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());

//Respond with a generic object.
app.get('/', function (req, res) {
    res.json({
        status: 'ok'
    });
    res.status(200);

})

//Respond with all items in the dataset.
app.get('/api/TodoItems', function (req, res) {
    res.status(200);
    res.json(data);
})

//Use a route parameter to respond with a single item with a matching todoItemId
app.get('/api/TodoItems/:number', function (req, res) {
    let item = req.params.number;

    for (let i = 0; i < data.length; i++) {
        if (data[i].todoItemId == item) {
            res.json(data[i]);
        }
    }
})

//Add item to dataset. If there is already an item with a matching todoItemId, overwrite existing item.
app.post('/api/TodoItems', function (req, res) {
    let newData = {
        todoItemId: req.body.todoItemId,
        name: req.body.name,
        priority: req.body.priority,
        completed: req.body.completed,
    };

    for (let i = 0; i < data.length; i++) {
        if (data[i].todoItemId == newData.todoItemId) {
            data.splice(i, 1, newData);
        } else {
            data.push(newData);
        }
        res.status(201);
        res.json(newData);
    }
})

//Use route param to remove item with a matching todoItemId from the dataset. Respond to the req w/deleted item.
app.delete('/api/TodoItems/:number', function (req, res) {
    let item = req.params.number;
    let newItem = [];

    for (let i = 0; i < data.length; i++) {
        if (data[i].todoItemId == item) {
            let newItem = data[i];
            data.splice(i, 1);
            res.json(newItem);
        }
       res.status(200);       
    }
})

module.exports = app; 
