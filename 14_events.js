const { log } = require("console");
const eventEmitter = require("events");


const myCustomEvent = new eventEmitter();

myCustomEvent.on("req", (name, age) => {
    console.log("User information: ", name, age);

})

myCustomEvent.on("req", () => {
    console.log("event triggred");

})


myCustomEvent.emit("req", "hamza", 13)



const http = require("http")

const server = http.createServer();

server.on("request", (req, res) => {
    console.log(req.url);
    res.end("hello");


})
server.listen(5000)