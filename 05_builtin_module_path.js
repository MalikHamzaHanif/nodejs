const path=require("path");


console.log(path.sep);
console.log(path.join("/files","userfiles","textone.txt"));
console.log(path.basename(path.join("/files","userfiles","textone.txt")));
console.log(path.resolve(__dirname,"files","userfiles","textone.text"));


