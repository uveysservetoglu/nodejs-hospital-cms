const mongoose = require("mongoose");

const Schema  = mongoose.Schema;

const model = {
    hospitalId            : { required : false, type : Number},
    webUrl                : { required : false, type : String},
    name                  : { required : true,  type : String},
    capitalName           : { required : true,  type : String},
    description           : { required : false, type : Number},
    contactInformation    : Schema.Types.ObjectId,
    departments           : Schema.Types.ObjectId,
    doctors               : Schema.Types.ObjectId,
    contractedInstitution : Schema.Types.ObjectId,
};

const modelSchema = new  Schema(model);

module.exports = mongoose.model("hospital", modelSchema);