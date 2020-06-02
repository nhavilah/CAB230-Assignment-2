// const mysql=require('mysql');

// const connection = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'Cab230!',
//     database:'webcomputing'
// });

// connection.connect(function(err){
//     if(err) throw err;
// });

// module.exports=(req,res,next)=>{
//     req.db=connection;
//     next()
// }

module.exports = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        database: 'webcomputing',
        user: 'root',
        password: 'Cab230!'
    }
});
