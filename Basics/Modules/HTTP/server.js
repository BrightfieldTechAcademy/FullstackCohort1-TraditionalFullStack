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
        })



});
server.listen(3000, () => console.log("server running on port 3000"))