function customMidleWareHandlerAdvance(arr, arg1, arg2) {
    let index = 0;
    function next() {
       
        if (index < arr.length) {
            const middleware = arr[index]
            if(middleware.length==2){
                if(index<arr.length){
                    index++;
                    middleware(arg1,arg2);
                    next()
                }
            }else{
                
                index++;
                middleware(arg1, arg2,next)
            }
        }
    }
    next()
}

function logOne(arg1,arg2){
    console.log("1");
    console.log(arg1,arg2);
    
    
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
function logFour(arg1,arg2){
    console.log("4");
    console.log(arg1,arg2);
}


customMidleWareHandlerAdvance([logOne,logFour,logTwo,logThree,logFour],{url:"/",method:"post"},"res")

//check for the length of args .. in logthree there are 3 args in function but no next Called so it stops there 

// 1
// { url: '/', method: 'post' } res
// 4
// { url: '/', method: 'post' } res
// 2
// { url: '/', method: 'post' } res
// 3
// { url: '/', method: 'post' } res

//no 4 ... b/c logThree never called next()