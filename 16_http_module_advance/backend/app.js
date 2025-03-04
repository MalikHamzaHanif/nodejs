const http = require("http")
const path = require("path")
const { readFileSync } = require("fs")
const homePage = readFileSync(path.resolve(__dirname, "../frontend", "home.html"));
const aboutPage = readFileSync(path.resolve(__dirname, "../frontend", "about.html"));
const contactPage = readFileSync(path.resolve(__dirname, "../frontend", "contactus.html"));
const registrationPage = readFileSync(path.resolve(__dirname, "../frontend", "registration.html"));
const bgImage = readFileSync(path.resolve(__dirname, "../frontend", "assets", "bg.jpg"));
const styleCss = readFileSync(path.resolve(__dirname, "../frontend", "style.css"));
const server = http.createServer((req, res) => {
    console.log(req.url);


    if (req.url === "/") {
        res.writeHead(200, { "content-type": "text/html" });
        res.write(homePage);
        res.end()
    } else if (req.url === "/home.html") {
        res.writeHead(200, { "content-type": "text/html" });
        res.write(homePage);
        res.end()

    } else if (req.url === "/contactus.html") {
        res.writeHead(200, { "content-type": "text/html" });
        res.write(contactPage);
        res.end()
    } else if (req.url === "/about.html") {
        res.writeHead(200, { "content-type": "text/html" });
        res.write(aboutPage);
        res.end()
    } else if (req.url === "/registration.html") {
        res.writeHead(200, { "content-type": "text/html" });
        res.write(registrationPage);
        res.end()
    } else if (req.url === "/assets/bg.jpg") {
        res.writeHead(200, { "content-type": "image/jpeg" });
        res.write(bgImage);
        res.end()
    }
    else if (req.url === "/style.css") {
        res.writeHead(200, { "content-type": "text/css" });
        res.write(styleCss);
        res.end()
    } else {

        res.writeHead(404, { "content-type": "image/html" });
        res.write("<h1>Error 404 not found !</h1>");
        res.end()

    }


})

server.listen(5000, () => {
    console.log("server is listening at port 5000...");

})