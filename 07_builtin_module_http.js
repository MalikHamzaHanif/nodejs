const http = require('http')

const server = http.createServer((req, res) => {
    console.log(req.url);

    if (req.url == "/") {
        res.end("Welcome to homepage");
        return;
    }
    if (req.url == "/about") {
        res.write("<h1>first</h1>")
        res.write("<h1>second</h1>")
        res.end("<h1>About apge</h1>")
        return;
    }

    res.end("error occured");

});
server.listen(5000)