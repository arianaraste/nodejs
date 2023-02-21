const rutenotfund = (res) => {
    res.writeHead(404 , {'content-type' : 'application/json'});
    res.write(JSON.stringify({'massage' : 'rute not fund'}));
    res.end();
    
};



const errorhandler = {
    rutenotfund , 
    
};

module.exports = errorhandler;