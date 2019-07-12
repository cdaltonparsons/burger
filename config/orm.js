var connection = require("./connection");

// helper functions for translating into SQL syntax
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    };
    return arr.toString();
};

// Helper function to convert object key/value pairs into SQL syntax
function objToSql(ob) {
    var arr = [];

    //loop through the keys and push the key/value as a string into arr
    for (var key in ob) {
        var value = ob[key];
        //check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if the string contains spaces, add quotations (Buffalo Blue Cheese Burger => 'Buffalo Blue Cheese Burger')
            if(typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            
            arr.push(key + "=" + value);
        };
    };
    
    return arr.toString();
};
};

// ORM object for all SQL queries
var orm = {
    all: function (table, cb) {
        connection.query("SELECT * FROM " + table + ";", function(err, result) {
            if (err) throw err;
            cb(result)
        });
    },
    create: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function(err, result){
            if(err) throw err;
            cb(result);
        });
    },
    update: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;
        // e.g. "UPDATE burgers SET devoured = true WHERE id = '1'"
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, result){
            if(err) throw err;
            cb(result);
        });
    },

};

module.exports = orm;