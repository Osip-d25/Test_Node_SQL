const mysql = require('mysql');
const config = require('../config');


const conn = mysql.createConnection({
    host: config.HOST,
    user: config.DBUSER,
    password:config.DBPASSWORD,
    database: config.DBNAME,
     port: config.PORT 
});

conn.connect((erreor) => {
    if(erreor){
        return console.log('Ошибка подключения к БД' /*+ err.message*/);
    } else{
        return console.log('Подключение успешно!');
    }

});

module.exports = conn;