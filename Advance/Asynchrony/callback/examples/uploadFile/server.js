const http = require('http');
const formidable = require('formidable');
const fs = require('fs');

let server = http.createServer();


//move to local
server.on('request', (req, res) => {
    uploadFile(req, res, function(fields, files) {
        var oldpath = files.filetoupload.filepath;
        const ext = files.filetoupload.originalFilename.split('.')[1]
        var newpath = `${__dirname}/uploads/${(new Date()).toISOString()}.${ext}`
        fs.rename(oldpath, newpath, function(err) {
            if (err) throw err;
            res.write('File uploaded and moved!');
            res.end();
        });
    })
})

/**
 * 
 */
const uploadFile = function(req, res, cb) {
    {
        if (req.url == '/uploadFile') {
            var form = new formidable.IncomingForm();
            form.parse(req, function(err, fields, files) {
                if (err) throw new Error(err)
                cb(fields, files)
            });
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<form action="uploadFile" method="post" enctype="multipart/form-data">');
            res.write('<input type="file" name="filetoupload"><br>');
            res.write('<input type="submit">');
            res.write('</form>');
            return res.end();
        }
    }
}

server.listen(3000)