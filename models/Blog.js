const mongoose = require("mongoose");

const Schema  = mongoose.Schema;

const model = {
    settings   : { required : false, type : JSON},
    key        : { required : false},
    parent     : Schema.Types.ObjectId,
    post       : Schema.Types.ObjectId,
    items      : Schema.Types.ObjectId,
    department : Schema.Types.ObjectId,
};

const modelSchema = new  Schema(model);

module.exports = mongoose.model("blog", modelSchema);