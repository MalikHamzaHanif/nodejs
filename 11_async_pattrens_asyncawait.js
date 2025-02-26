const { readFile, writeFile } = require("fs");
const path = require("path")
function readFilePromsie(path) {
    return new Promise((resolve, reject) => {
        readFile(path, { encoding: "utf-8" }, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    })
}

function writeFilePromsie(path, data) {
    return new Promise((resolve, reject) => {
        writeFile(path, data, { encoding: "utf-8", flag: "a" }, (err) => {
            if (err) {
                reject(err);
            }
            resolve("data written on file ");
        });
    })
}


const pathOne = path.resolve(__dirname, "files", "userfiles", "textone.txt");
const pathFive = path.resolve(__dirname, "files", "userfiles", "textfive.txt");

async function consumePromises() {
    try {
        const data = await readFilePromsie(pathOne);
        const message = await writeFilePromsie(pathFive, data);
        console.log(message);

    } catch (e) {
        console.log(e);

    }

}

consumePromises()