//mysqldb.js

/*
    initiate a mysql connection pool and export to as a function and query
*/


var helper = require('../helper/helper.js')
var mysql = require('mysql');
var db={};

//query data with the paramters
var query= function(sqlstring, data, callback){
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
        connection.query(queryString, queryData, function(err, rows, fields ){
            if (err) {
                    ctx.body=error;
                    throw err;
                    };

                 console.log(helper.timeStamp()+'--Last record insert id:');
             callback(rows);
        });

        //close connection
        connection.end(function(err){
            if(err){
                return;
            }else{
                console.log(helper.timeStamp()+'--mysql onnection is closed !');
            }
        });

        //connection on error 
        connection.on('error', function(err) {
            console.log(helper.timeStamp()+'--db error', err);
            if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
              //handleDisconnect(); 
              throw err;                        // lost due to either server restart, or a
            } else {                                      // connnection idle timeout (the wait_timeout
              throw err;                                  // server variable configures this)
            }
          });

};

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



module.exports ={query, queryStar, insert}