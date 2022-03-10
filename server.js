var http = require('http'),
    config = require('./config'),
    fileHandler = require('./filehandler'),
    parse = require('url').parse,
    types = config.types,
    rootFolder = config.rootFolder,
    defaultIndex = config.defaultIndex,
    server;

module.exports = server = http.createServer();

server.on('request', (req, res) => {
    var filename = parse(req.url).pathname,
        fullPath,
        extension;

    if (filename === "/") {
        filename = defaultIndex;
    }

    fullPath = rootFolder + filename;
    extension = filename.substr(filename.lastIndexOf('.') + 1);

    fileHandler(fullPath, (data) => {
            res.writeHead(200, {
                'Content-type': types[extension || 'text/plain'],
                'Content-length': data.length
            });

            res.end(data);
        }, (err) => {
            res.writeHead(404);
            res.end();
        }
    );
});