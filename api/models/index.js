
const mongoose = require('mongoose');

const db = {};

db.mongoose = mongoose;

db.user = require('./userModel');
db.todo=require('./toDoModel');

module.exports= db;