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

            let status = 404;
            const response = {
                success: false,
                data: null,
            };
            if (method === 'GET' && url === '/') {
                status = 200;
                response.success = true;
                response.data = "<h1>Todo API</h1>"
            }
            if (method === 'GET' && url === '/todos') {
                status = 200;
                response.success = true;
                response.data = todos;
            }

            if (method === 'POST' && url === '/todos') {
                const { id, text } = JSON.parse(body);
                if (!id || !text) {
                    res.end("no data sent ")
                } else {
                    todos.push({ id, text })
                    status = 201;
                    response.success = true;
                    response.data = todos;
                }
            }

            // GET /todos/:id
            if (method === 'GET' && url.match(/todos\/([0-9]+)/)) {
                let id = parseInt(req.url.split("/")[2]);
                let data = todos.filter(each => each.id === id)
                status = 200;
                response.success = true;
                response.data = data;
            }


            // put /todos/:id
            if (method === 'PUT' && url.match(/todos\/([0-9]+)/)) {
                let id = parseInt(req.url.split("/")[2]);
                const { text } = JSON.parse(body);
                let data;
                for (let index = 0; index < todos.length; index++) {
                    if (id === todos[index].id) {
                        todos[index].text = text
                        data = todos[index]
                    }
                }
                status = 204;
                response.success = true;
                response.data = data;
            }


            // delete /todos/:id
            if (method === 'DELETE' && url.match(/todos\/([0-9]+)/)) {
                let id = parseInt(req.url.split("/")[2]);
                for (let index = 0; index < todos.length; index++) {
                    if (id === todos[index].id) {
                        todos.splice(index, 1)
                    }
                }
                status = 201;
                response.success = true;
                response.data = todos;
            }

            res.writeHead(status, {
                'Content-Type': 'application/json',
                'X-Powered-By': 'Node.js',
            });

            res.end(JSON.stringify(response));
        })

});
server.listen(3000, () => console.log("server running on port 3000"))