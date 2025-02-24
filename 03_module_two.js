const myFunctions = require("./02_module_one");
console.log(myFunctions);
const { printName, printUserData } = require("./02_module_one")
printName(myFunctions.personData.name)
printUserData(myFunctions.singlePerson)
