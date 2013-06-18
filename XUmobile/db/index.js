var mdb = require('mongoose');
var Schema = mdb.Schema;
var db;
var userDb = require("./user");
var listDb = require("./list")


exports = module.exports = {
    user:userDb,
    list:listDb
}
