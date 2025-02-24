function printUserData(data) {
    console.log(data);

}

function printFileStartedRunning() {
    console.log("file is running");

}


function printName(name) {
    console.log(name);

}
printFileStartedRunning();
module.exports = { printName, printUserData }

module.exports.personData = {
    name: "ali",
    age: 45,
    dpt: "cs"
}


let hamza = {
    name: "hamza",
    age: 78,
    dpt: "CE"
}

module.exports.singlePerson = hamza