const mongoose = require("mongoose");

const Schema   = mongoose.Schema;

const model    = {
      url : { required : false, type : String},
      previewImage : { required : true, type : String},
      type :  { required : true, type : String},
      mime :  { required : true, type : String}
};

const modelSchema = Schema(model);

module.exports = mongoose.model("media");