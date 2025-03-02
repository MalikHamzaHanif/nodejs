const { createReadStream, createWriteStream, readFileSync } = require("fs")
const path = require("path")
// // for (let i = 0; i < 100000; i++) {
// //     writeFileSync(path.resolve(__dirname, "files", "userfiles", "big.txt"), `Hello i am hamza ${i}`, { encoding: "utf-8", flag: "a" });
// // }


const http=require("http")

const server=http.createServer((req,res)=>{
    const text=readFileSync(path.resolve(__dirname,"files","userfiles","big.txt"),{encoding:"utf-8"})
    // res.end(text);

    const streamedText=createReadStream(path.resolve(__dirname,"files","userfiles","big.txt"),{encoding:"utf-8",highWaterMark:9000});
    // streamedText.pipe(res)

    streamedText.on("data",(data)=>{
        res.write(data)
    })
    streamedText.on("error",(e)=>{
        res.end(e)
    })

    streamedText.on("end",()=>{
        res.end("completed")
    })
})


server.listen(5000)


// const streamedText=createReadStream(path.resolve(__dirname,"files","userfiles","big.txt"),{encoding:"utf-8",highWaterMark:9000});
// const writeStreamedText=createWriteStream(path.resolve(__dirname,"files","userfiles","bigtwo.txt"))

// streamedText.pipe(writeStreamedText);

// writeStreamedText.on("finish",()=>{
//     console.log("completed");

// })
// const streamedText = createReadStream(path.resolve(__dirname, "files", "userfiles", "big.txt"), { encoding: "utf-8", highWaterMark: 9000 });

// streamedText.on("data", (data) => {
//     console.log(data);

// })

// streamedText.on("error", (err) => console.log(err)
// )