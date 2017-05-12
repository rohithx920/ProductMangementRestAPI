var express=require('express');

var routes=function(Product){
//var Book=require('../models/bookModel');

//var Product=require('../models/productModel')
var prouductRouter = express.Router();

var productController=require('../Controllers/productControllers')(Product);

//better way to handle all the 
prouductRouter.route('/')
        .post(productController.post)
        .get(productController.get);

//For single id
prouductRouter.use('/:productId',function(req,res,next){
    Product.findById(req.params.productId,function(err,Product){
                console.log(req.params.productId);
                if(err){
                    res.status(500).send(err);
                    console.log(err);
                }
                else if(Product){
                    console.log('connected Book exists'+Product);
                    req.Product=Product;
                    next();
                    //res.json(book);
                }
                else{
                    res.status(404).send('no book found');
                }
            })
})
prouductRouter.route('/:productId')
        .get(function(req,res){
            console.log('we are in get');
            var returnProduct=req.Product.toJSON();
            //console.log(returnProduct);
            //returnProduct.links={};
            //returnProduct.links.SimilarGenre='http://'+req.headers.host+'/api/books/?genre='+req.book.genre
            
            res.json(returnProduct);
        })
        .put(function(req,res){
               
                    console.log('connected');
                    req.Product.productId=req.body.productId;
                    req.Product.productName=req.body.productName;
                    req.Product.productCode=req.body.productCode;
                    req.Product.releaseDate=req.body.releaseDate;
                    req.Product.description=req.body.description;
                    req.Product.price=req.body.price;
                    req.Product.starRating=req.body.starRating;
                    req.Product.imageUrl=req.body.imageUrl;

                    req.Product.save(function(err){
                    if(err)
                    res.status(500).send(err);
                    else{
                        res.json(req.book);
                    }
                });
                    
                
            })
            .patch(function(req,res){
                console.log('patch going on');
                if(req.body._id)
                    delete req.body._id
                //for every key in req.body
                for(var p in req.body){
                    console.log(p);
                    req.Product[p]=req.body[p];
                }
                req.Product.save(function(err){
                    if(err)
                    res.status(500).send(err);
                    else{
                        console.log('patch updating');
                        res.json(req.book);
                    }
                });
            })
            .delete(function(req,res){
                req.Product.remove(function(err){
                    if(err)
                    res.status(500).send(err);
                    else{
                        console.log('patch updating');
                        res.status(204).send('book deleted');
                    }
                })
            });

return prouductRouter;
};

module.exports=routes;