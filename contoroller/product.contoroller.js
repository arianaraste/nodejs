const productmodel = require("./../model/product.model");

    async function get(req,res){

        try {

            const product = await productmodel.find();
            res.writeHead(200 , {'content-type' : 'application/json'});
            res.write(JSON.stringify(product));
            res.end();

        } catch (error) {
            console.log(error);
        };

    };

    async function getbyid(req,res){

        try {

            const [,,id] =  await req.url.split("/")
            const productid = await productmodel.findbyid(id);
            if (!productid) {

                res.writeHead(404 , {'content-type' : 'application/json'});
                res.write(JSON.stringify({"massage" : "not fund id"}));
                res.end();

            };
            res.writeHead(200 , {'content-type' : 'application/json'});
            res.write(JSON.stringify(productid));
            res.end();

        } catch (error) {
           console.log(error);
        }

    };

    async function adding(req , res){
        try {


            req.on("data" , async (chunk) => {
            let body = ""
            body += chunk;
               
            const obj = await JSON.parse(body);
            
            
            obj.id = new Date()
            
            const index = await productmodel.products_length();
            
            if(obj.id <= index){
                obj.id = index+1
            }else if (obj.id >= index+1){
                obj.id = index+1
            }
            
            
            
            const product_pushing = await productmodel.pushing(obj);
            
        });
            req.on("end" , ()=> {

                res.writeHead(200 , {'content-type' : 'application/json'});
                res.write(JSON.stringify({"massage" : "pushing new product sucsses"}));
                res.end();

            });

        } catch (error) {
            
            console.log(error);
        }
    };


                    
async function updating(req ,res) {
    
    try {
        
        req.on("data" , async (chunk) => {
            let body = "";
            body += chunk;
        
            const parsebody = JSON.parse(body);
            
            const [,,id] =  await req.url.split("/");
            const productid = await productmodel.findbyid(id);
            if (!productid) {
                res.writeHead(404 , {'content-type' : 'application/json'});
                res.write(JSON.stringify({"massage" : "not fund id"}));
                res.end();
            }else{
                await productmodel.update(productid,parsebody);
            }})
            req.on("end" , async() => {
                res.writeHead(200 , {'content-type' : 'application/json'});
                res.write(JSON.stringify({"massage" : "update succses"}));
                res.end();
            });
  
    } catch (error) {
        console.log(error);
    }


};

async function deleting (req , res){

    
    try {
        
        req.on("data" , async (chunk) => {
            let body = "";
            body += chunk;
        
            const parsebody = JSON.parse(body);
            
            const [,,id] =  await req.url.split("/");
            const productid = await productmodel.findbyid(id);
            if (!productid) {
                res.writeHead(404 , {'content-type' : 'application/json'});
                res.write(JSON.stringify({"massage" : "not fund id"}));
                res.end();
            }else{
                await productmodel.remove(productid);
            }})
            req.on("end" , async() => {
                res.writeHead(200 , {'content-type' : 'application/json'});
                res.write(JSON.stringify({"massage" : "remove succses"}));
                res.end();
            });
  
    } catch (error) {
        console.log(error);
    }



}


          


    const product_contoroller = {

        get,
        getbyid,
        adding,
        updating,
        deleting

    };

    module.exports = product_contoroller;
