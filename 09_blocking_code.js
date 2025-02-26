const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.end("Homepage");
        return;
    }
    if (req.url === "/about") {
        for (let i = 0; i < 1000; i++) {
            for (let j = 0; j < 1000; j++) {
                for (let k = 0; k < 1000; k++) {
                    console.log(k);

                }
            }
        }
        res.end("About page")
        return;
    }

    res.end("error")

})

server.listen(5000);