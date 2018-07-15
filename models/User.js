const mongoose = require("mongoose");

const Schema  = mongoose.Schema;

const model = {
    password   : { required : false, type : String},
    username        : { required : [false, 'Bir kullanıcı giriniz!'], type : String, maxLength : 80, minLength : 5 },
};

const modelSchema = new  Schema(model);

module.exports = mongoose.model("user", modelSchema);