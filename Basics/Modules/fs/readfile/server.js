var http = require('http');
var fs = require('fs');
http.createServer(function(req, res) {
    let data = []
    fs.readFile(__dirname + '/demofile1.html', function(err, html) {
        res.write(html);
        return res.end();
    });
}).listen(8080);