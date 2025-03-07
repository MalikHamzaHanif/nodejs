
function customMidleWareHandler(arr, arg1, arg2) {
    index = 0;
     function next() {
        
        if (index < arr.length) {
            const middleware=arr[index];
            index++;
            middleware(arg1, arg2, next)
        }
    }
    next()
}


function logOne(arg1,arg2,next){
    console.log("1");
    console.log(arg1,arg2);
    next();
    
}
function logTwo(arg1,arg2,next){
    console.log("2");
    console.log(arg1,arg2);
    next();
    
}
function logThree(arg1,arg2,next){
    console.log("3");
    console.log(arg1,arg2);
    
    
}
function logFour(arg1,arg2,next){
    console.log("4");
    console.log(arg1,arg2);
    
    
}


customMidleWareHandler([logOne,logTwo,logThree,logFour],{url:"/",method:"post"},"res")








