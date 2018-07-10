const mongoose = require("mongoose");

const Schema   = mongoose.Schema;

const model    = {
      name : { required : false, type : String},
      code : { required : true, type : String},
      isDefault : { type: Boolean }
};

const modelSchema = Schema(model);

module.exports = mongoose.model("language")