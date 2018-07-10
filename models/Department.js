const mongoose = require("mongoose");

const Schema   = mongoose.Schema;

const model    = {
      name : { required : false, type : String},
      description : { required : true, type : String},
      doctors : Schema.Types.ObjectId,
      hospitals : Schema.Types.ObjectId,
      blog : Schema.Types.ObjectId,
      link : { required : false, type : String}
};

const modelSchema = Schema(model);

module.exports = mongoose.model("department")