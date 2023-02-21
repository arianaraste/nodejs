const product_addres = "./../api/product.json";


const products = require("./../api/product.json")

const fs = require("fs");
const { resolve } = require("path");


async function find(){

    return new Promise((resolve , reject) => {
        resolve(products.product_list);

    })
};

async function findbyid(id){

    return new Promise((resolve , reject) => {

        const obj = products.product_list.find((x) => {
            return x.id == id

        });
        resolve(obj);
    })
};

async function pushing(newproduct) {
    return new Promise((resolve, reject) => {
         
        products.product_list.push(newproduct);
        
                fs.writeFile(`${process.cwd}${product_addres}`, JSON.stringify(products)  , (err) => {
                if (err) {
                    
                    reject(err);
                    console.log(err);

                }else{
                    resolve(JSON.stringify({"massage" : "succses"}));
                }

            });
         
        })};


async function remove(id) {
    return new Promise ((resolve , reject) => {
            const productsli = products.product_list;
            const index = id.id-1;
            delete productsli[index];
            if(!index)


            fs.writeFile(`${process.cwd}${product_addres}`, JSON.stringify(products) , (err) => {
                reject(err);
            });
            resolve();
    })};
        

async function products_length(){
    return new Promise((resolve , rejects) => {
        resolve(products.product_list.length);
    });
};

async function update(id , newdata) {

    return new Promise((resolve , reject) => {
       
        console.log(newdata , id);
       // const assaign = Object.assign(newdata , id);
        const index =  id.id-1;
        newdata.id = id.id
        products.product_list[index] = newdata;
      
      fs.writeFile(`${process.cwd}${product_addres}`, JSON.stringify(products)  , (err) => {
        if (err) {
            
            reject(err);
            console.log(err);

        }else{
            resolve(JSON.stringify({"massage" : "succses"}));
        }

    });

       
                  

    })};
    


const productmodel = {
    find,
    findbyid,
    pushing,
    products_length,
    update,
    remove
};

module.exports = productmodel;

