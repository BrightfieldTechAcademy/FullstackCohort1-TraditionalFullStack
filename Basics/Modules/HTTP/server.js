const http = require('http');
let todos = [
    { id: 1, text: "Eat Breakfat" },
    { id: 2, text: "Work till 12pm" },
    { id: 3, text: "Break till 1pm" },
    { id: 4, text: "Work till 3pm" }
]
const server = http.createServer((req, res) => {
    const { method, url } = req;
    let body = [];
    req.on('data', (data) => {
            body.push(data)
        })
        .on('end', () => {
            body = Buffer.concat(body).toString()
            if (method === 'GET' && url === '/') {

                res.end("<h1>Todo API</h1>")
            }
            if (method === 'GET' && url === '/todos') {

                res.end(JSON.stringify(todos))
            }

            if (method === 'POST' && url === '/todos') {
                const { id, text } = JSON.parse(body);
                if (!id || !text) {
                    res.end("no data sent ")
                } else {
                    todos.push({ id, text })
                    res.end(JSON.stringify(todos))
                }
            }

            // GET /todos/:id
            if (method === 'GET' && url.match(/todos\/([0-9]+)/)) {
                let id = parseInt(req.url.split("/")[2]);
                let data = todos.filter(each => each.id === id)
                res.end(JSON.stringify(data))
            }


            // put /todos/:id
            if (method === 'PUT' && url.match(/todos\/([0-9]+)/)) {
                let id = parseInt(req.url.split("/")[2]);
                const { text } = JSON.parse(body);
                for (let index = 0; index < todos.length; index++) {
                    if (id === todos[index].id) {
                        todos[index].text = text
                    }
                }
                res.end(JSON.stringify(todos))
            }


            // delete /todos/:id
            if (method === 'DELETE' && url.match(/todos\/([0-9]+)/)) {
                let id = parseInt(req.url.split("/")[2]);
                for (let index = 0; index < todos.length; index++) {
                    if (id === todos[index].id) {
                        todos.splice(index, 1)
                    }
                }
                res.end(JSON.stringify(todos))
            }
        })



});
server.listen(3000, () => console.log("server running on port 3000"))