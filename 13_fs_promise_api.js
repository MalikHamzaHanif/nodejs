const {readFile,writeFile} = require("fs").promises;
const path = require("path");

const pathOne = path.resolve(__dirname, "files", "userfiles", "textone.txt");
const pathFive = path.resolve(__dirname, "files", "userfiles", "textfive.txt");

readFile(pathOne, "utf-8")
    .then((data) => {
        console.log(data);
        return writeFile(pathFive, data, { flag: "a" });
    })
    .then(() => {
        console.log("write successful");
    })
    .catch((err) => {
        console.error(err);
    });
