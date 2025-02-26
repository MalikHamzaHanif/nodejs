const utils = require("util")
const { readFile, writeFile } = require("fs");
const path = require("path");
const readFilePromsie = utils.promisify(readFile)
const writeFilePromsie = utils.promisify(writeFile)
const pathOne = path.resolve(__dirname, "files", "userfiles", "textone.txt");
const pathFive = path.resolve(__dirname, "files", "userfiles", "textfive.txt");
readFilePromsie(pathOne, "utf-8").then((data) => {
    console.log(data);
    return writeFilePromsie(pathFive, data, { encoding: "utf-8", flag: "a" });

}).then((message) => {
    console.log(message);

}).catch(e => console.log(e)
)