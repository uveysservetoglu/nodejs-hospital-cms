const mongoose = require("mongoose");

const Schema  = mongoose.Schema;

const model = {
    content    : { required : false, type : JSON},
    sortOrder  : { required : false, type : Number},
    author     : Schema.Types.ObjectId,
    blog       : Schema.Types.ObjectId,
};

const modelSchema = new  Schema(model);

module.exports = mongoose.model("blogPost", modelSchema);