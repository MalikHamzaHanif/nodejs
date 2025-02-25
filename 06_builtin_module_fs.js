// const {readFileSync , writeFileSync}=require("fs")
// const path=require("path")
// const dataone=readFileSync(path.resolve(__dirname,"files","userfiles","textone.txt"),{encoding:"utf-8"});
// const datatwo=readFileSync(path.resolve(__dirname,"files","userfiles","texttwo.txt"),{encoding:"utf-8"});
// console.log(dataone);
// console.log(datatwo);
// writeFileSync(path.resolve(__dirname,"files","userfiles","textthree.txt"),`adding data to the file:${dataone}, ${datatwo}`,{flag:'a'});


const { readFile, writeFile } = require("fs")
const path = require("path")

readFile(path.resolve(__dirname, "files", "userfiles", "textone.txt"), { encoding: "utf-8" }, (err, result) => {

    readFile(path.resolve(__dirname, "files", "userfiles", "texttwo.txt"), { encoding: "utf-8" }, (err, data) => {
        console.log(result);
        console.log(data);
        writeFile(path.resolve(__dirname, "files", "userfiles", "textfour.txt"), `${result}+${data}`, { flag: "a" }, (err, writeresult) => {
console.log(writeresult);

        })
    })
})