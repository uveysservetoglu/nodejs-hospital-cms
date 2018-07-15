const mongoose = require("mongoose");

const Schema  = mongoose.Schema;

const model = {
    settings   : { required : false, type : JSON},
    key        : { required : [false, '{PATH} alanı giriniz!'], type : String, maxLength : 80, minLength : 150 },
    parent_id  : Schema.Types.ObjectId,
    post_id    : Schema.Types.ObjectId,
    items_id      : Schema.Types.ObjectId,
    department_id : Schema.Types.ObjectId,
};

const modelSchema = new  Schema(model);

module.exports = mongoose.model("blog", modelSchema);