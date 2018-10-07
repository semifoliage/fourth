//mysqlPool.js
/*
*create mysql db connection pool and output the interface
*/

var helper = require('../helper/helper.js')
var mysql = require('mysql');
var db={};
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Business_1',
    database: 'app1'
});

//query data with the paramters
var query= function(sqlstring, data, callback){
        //initiate connect
        pool.getConnection(function(err,conn){
            if(err){
                console.log(helper.timeStamp()+'--pool connection error')
                console.log(err.message);
                callback(err,null,null);
            }else{
                //execute query
                conn.query(sqlstring,data,function(err,results,fields){
                    //query call back
                    if (err) {
                        console.log(helper.timeStamp()+'--query in mysql pool error');
                        console.log(err);                         
                        throw err;
                        };
    
                     console.log(helper.timeStamp()+'--query in mysql pool success:');
                 callback(rows);
                });
                //release pool connection
                conn.release();
            }
        });
    
        

};

/*
//query all data
var queryStar= function(sqlstring,  callback){
        //initiate connect
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Business_1',
            database: 'app1'
        });
        //connect
        connection.connect(function(err){
            if(err) throw err;
        });

        //execute query
        var queryString= sqlstring;

        connection.query(queryString,  function(err, rows, fields ){
            if (err) {
                    ctx.body=error;
                    throw err;
                    };

                 console.log('Last record insert id:');
             callback(rows);
        });

        //close connection
        connection.end(function(err){
            if(err){
                return;
            }else{
                console.log('mysql onnection is closed !');
            }
        });

};

// insert data
var insert= function(sqlstring, data, callback){
        //initiate connect
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Business_1',
            database: 'app1'
        });
        //connect
        connection.connect(function(err){
            if(err) throw err;
        });

        //execute query
        var queryString= sqlstring;
        var queryData=data;
        connection.query(queryString, queryData, function(err, res ){
            if (err) {
                    ctx.body=error;
                    throw err;
                    };

                 console.log('Last record insert id:');
             callback(res);
        });

        //close connection
        connection.end(function(err){
            if(err){
                return;
            }else{
                console.log('mysql onnection is closed !');
            }
        });

};

*/

module.exports ={query }