const http = require("http");
const product = require("./contoroller/product.contoroller");
const err = require("./contoroller/errorhandle");

const port = 8080

const server = http.createServer((req , res) => {

    if(req.url == "/product" && req.method == "GET"){

        product.get(req , res);
        
    }else if(req.url.match("/\product/\[0-9]+") && req.method == "GET" ){

        product.getbyid(req ,res)

    }else if(req.url == "/product/add" && req.method == "POST" ){

        product.adding(req ,res)

    }else if(req.url.match("/\product/\[0-9]+") && req.method == "PUT"){
        
        product.updating(req , res);

    }else if(req.url.match("/\product/\[0-9]+") && req.method == "DELETE"){
        
        product.deleting(req , res);

    }else{
        
        err.rutenotfund(res);
        
    }
    

}
).listen(port)

const runserver = `http://localhost:${port}`;

console.log(`server run : ${runserver}`);
