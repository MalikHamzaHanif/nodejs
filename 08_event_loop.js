// console.log("task started");
// setTimeout(() => {
//     console.log("timeout");
// }, 0);
// console.log("task ended");



console.log("task started");
const { readFile } = require("fs")
const path = require("path")
readFile(path.resolve(__dirname, "files", "userfiles", "textone.txt"), { encoding: "utf-8" }, (err, data) => {
    console.log(data);
    console.log("reading file data finished");

})

console.log("task completed");


