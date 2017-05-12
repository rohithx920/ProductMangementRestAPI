var productController=function(Product){
    var post=function(req,res){
            console.log(req.body);
            var product=new Product(req.body);
            product.save();
            console.log(product);
            res.status(201).send(product);
        }
        var get=function(req,res){
            //var query=req.query;
            //http://localhost:8091/api/books/?genre=Fiction
            
            // var query={};
            // if(req.query.genre){
            //     query.genre=req.query.genre;
            // }
            
            Product.find(function(err,products){
                if(err){
                    res.status(500).send(err);
                    console.log(err);
                }
                else{
                    var returnProducts=[];
                    products.forEach(function(element,index, array){
                        var newProduct=element.toJSON();
                        newProduct.links={};
                        newProduct.links.self='http://'+req.headers.host+'/api/products/'+newProduct._id;
                        returnProducts.push(newProduct);
                    })
                    console.log('connected');
                    res.json(returnProducts);
                }
            })
            
            //var responseJson={Hello:'My api'};
            //res.json(responseJson);
        }
        return {
            post:post,
            get:get
        }
}

module.exports=productController;