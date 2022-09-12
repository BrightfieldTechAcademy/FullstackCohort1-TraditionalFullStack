const express = require('express')
const app = express()

app.use(express.static('public'))

app.get('/', function(req, res) {
    res.send('Hello World')
})

app.get('/todos', function(req, res) {
    res.send('Todos')
})

app.get('/todos/:id', function(req, res) {
    res.send(req.params.id)
})

app.listen(3000)