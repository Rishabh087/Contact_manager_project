import constants from "../constants.js" ; 

const errorHandler = (err, req , res  , next ) => {

const statusCode  =  res.statusCode ? res.statusCode : 500 ;

switch (statusCode) {
case constants.VALIDATION_ERROR:
res.json({
    title: "VALIDATION_ERROR" ,
     message: err.message ,
      stackTrace:err.stack,
    });

 
case  constants.UNAUTHERIZED:
res.json({title: "UNAUTHERIZED" , message: err.message , stackTrace:err.stack});


case constants.FORBIDDEN:
res.json({title: "FORBIDDEN" , message: err.message , stackTrace:err.stack});


case constants.NOT_FOUND:
res.json({
    title: "NOT_FOUND" ,
    message: err.message , 
    stackTrace:err.stack,
    });


case constants.SERVER_ERROR:
res.json({title: "SERVER_ERROR" , message: err.message , stackTrace:err.stack});

default:
    console.log("No error , All good!");
    break;
    //benifit of using stacktrace is that it will show which file has the problem
       // and all related file paths .

}
}

export default errorHandler;
