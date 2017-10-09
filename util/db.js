const dbhost = "hzzmdata.mysql.rds.aliyuncs.com";
const dbuser = "zuma_stat_read";
const dbdatabase = "zuma_stat";
const dbpassword = "cQO1fKzQ";
const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: dbhost,
    user: dbuser,
    password: dbpassword,
    database: dbdatabase
});

module.exports = pool;