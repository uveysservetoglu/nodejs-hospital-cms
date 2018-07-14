const mongoose = require("mongoose");

const Schema  = mongoose.Schema;

const model = {
    settings   : { required : false, type : JSON},
    key        : { required : false, type : String},
    parent_id  : Schema.Types.ObjectId,
    post_id    : Schema.Types.ObjectId,
    items_id      : Schema.Types.ObjectId,
    department_id : Schema.Types.ObjectId,
};

const modelSchema = new  Schema(model);

module.exports = mongoose.model("blog", modelSchema);