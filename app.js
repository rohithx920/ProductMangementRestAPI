var express=require('express')
var mongoose=require('mongoose')

var bodyParser=require('body-parser');

var db=mongoose.connect('mongodb://localhost/productapi')

var Product=require('./models/productModel');



var app=express();

var port=process.env.port || 3000;

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

productRouter=require('./Routes/productRoutes')(Product);
app.use('/api/products',productRouter);

app.get('/',function(req, res){
    res.send("welcome to API!!");
})


app.listen(port,function(){
    console.log('running on port'+port);
})


