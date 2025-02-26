const loDash=require("lodash")

let arr=[1,2,4,[4,5,6,7,[6,7,8,9,[8,9,0]]]]

console.log(loDash.flattenDeep(arr));
