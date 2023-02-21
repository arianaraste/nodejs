const http = require("http");
const api = require("./api/product.json")

const port = 8080

const server = http.createServer((req , res) => {

    if(req.url == "/product"){

        res.writeHead(200 , {'content-type' : 'text/plain'});
        res.write(JSON.stringify(api.product_list));
        res.end();

    }else if (req.url.match("/\product/\[0-9]+")){

        const id = req.url.split("/")[2];
        const minezlen = api.product_list.length-1
        res.writeHead(200 , {'content-type' : 'text/plain'});

        
        
        res.write(JSON.stringify(minezlen[id]));
        res.end();

    }else{

        res.writeHead(404 , {'content-type' : 'application/json'});
        res.write(JSON.stringify({'massage' : 'rute not fund'}));
        res.end();
        
    }
    res.end()

}
).listen(port)

const runserver = `http://localhost:${port}`;

console.log(runserver);
