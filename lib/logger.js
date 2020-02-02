// eslint-disable-next-line strict
'use strict';

module.exports = ( req ,res ,next) =>{
  console.log('request info:' , req.method , req.path  );
  let endDate = new Date().toDateString();
  console.log(`${req.method} ${req.path} done in ${endDate}`);
  next();
};