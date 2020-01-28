'use strict';

const express = require('express');
const app = express();
const logRequest = require('../lib/logger.js');
app.use(express.json()); // to represent my data as json format // global middleware 
app.use(logRequest);
//============================================== Express Routes ==========================================//
app.get('/categories' , (req , res) =>{
    let output = {
        name : req.query.name
    }
    res.status(200).json(output);
});

app.get('/products' , () =>{
    let output = {
        category : req.query.category,
        display_name : req.query.display_name,
        description : req.query.discription
    }
    res.status(200).json(output);
});

app.post('/catogeries' , (req , res) =>{
 console.log('request body ():' , req.body);
res.status(201).send('category added');
});

app.post('/products' , (req , res) =>{
    console.log('request body ():' , req.body);
   res.status(201).send('product added');
   });
//////////////////////////////////////// Middleware  ////////////////////////////////////////////
function timestamp(timestamp) {
return (req , res , next) =>{
     timestamp = new Date().toDateString(); // to give me batter way to show the date 
    console.log('timeeeee' , timestamp);
    req.requestTime = timestamp;
    next();
  }
}
// error middleware // is the last thing always (last pint)
function errorHandler(err , req , res , next) {
    res.status(500);
    res.statusMassage = 'Server Error';
    res.json({error : err});   
}

function notFoundHandlr(req , res , next) {
    res.status(404);
    res.statusMassage = 'Not Found';
    res.json({ error : ' Not Found'});
    
}
app.get('/date' , timestamp(timestamp), (req , res) =>{
    let output ={
      timestamp : req.requestTime
    };
    res.status(200).json(output);
});
// I don't have to ask the client about input to update the Date 

//=========================================== API Routes ==============================================//

let dbCategory = [];
let dbProduct = [];

///------------------------- GET equest to the items in DB ----------------------///
/// vary comman convantion
app.get('/api/v1/category' , (req , res , next) =>{
  let count = dbCategory.length;
  let results = dbCategory;
  res.json({ count , results});
});

app.get('/api/v1/product' , (req , res , next) =>{
    let count = dbProduct.length;
    let results = dbProduct;
    res.json({ count , results});
  });
// request params is array of call instractar to any thing I pass in the root name 
app.get( '/api/v1/category/:id' , (req , res , next) =>{
let id = req.params.id;
let record = dbCategory.filter((record) => record.id === parseInt(id));
res.json(record);
});

app.get( '/api/v1/product/:id' , (req , res , next) =>{
    let id = req.params.id;
    let record = dbProduct.filter((record) => record.id === parseInt(id));
    res.json(record);
    });

///------------------------ POST reqest to add items to DB -----------------------///
app.post('/api/v1/category' , (req , res , next) =>{
    let { name} = req.body;
    let record = { name} ;
    record.id = dbCategory.length + 1 ;
    timestamp = req.requestTime
    dbCategory.push(record);

    res.status(201).json(record);
});

app.post('/api/v1/product', timestamp(), (req , res , next) =>{
    let { category , display_name , description} = req.body;
    let record = { category , display_name , description} ;
    record.id = dbProduct.length + 1 ;
    dbProduct.push(record);
    res.status(201).json(record);
});


/// ---------------------- PUT requests to update items in DB ----------------------///

app.put('/api/v1/category/:id' , (req , res , next) =>{
    let idToUpdate = req.params.id;
    let {name , id } = req.body;
    let updateRecord = { name , id};
    dbCategory = dbCategory.map((record) => ( record.id === parseInt(idToUpdate))? updateRecord : record);
    res.json(updateRecord);
});

app.put('/api/v1/product/:id' , (req , res , next) =>{
    let idToUpdate = req.params.id;
    let {category , display_name , description,  id } = req.body;
    let updateRecord = {category , display_name , description , id};
    dbProduct = dbProduct.map((record) => ( record.id === parseInt(idToUpdate))? updateRecord : record);
    res.json(updateRecord);
});

///---------------------- DELETE requests to delete item from DB -----------------///

app.delete('/api/v11/category/:id' , (req , res , next) =>{
    let id = req.params.id;
    dbCategory = dbCategory.filter((record) => record.id !== parseInt(id));
    res.json({ massage : ' Category Deleted'})
});

app.delete('/api/v11/product/:id' , (req , res , next) =>{
    let id = req.params.id;
    dbProduct = dbProduct.filter((record) => record.id !== parseInt(id));
    res.json({ massage : ' Product Deleted'})
});


module.exports = {
    server : app,
    start : port =>{
        let PORT = port || process.env.PORT || 3000;
        app.listen( PORT , () => console.log(`listening on ${PORT}`));
    }
}