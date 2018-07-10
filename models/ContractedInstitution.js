const mongoose = require("mongoose");

const Schema   = mongoose.Schema;
const model    = {
      title  : { required : false, type: String},
      url    : { required : false, type: String},
      type   : { required : true, type: String},
      patientPaysFirst   : { required : true, type: Boolean},
      hospitals   : Schema.Types.ObjectId
};

const modelSchema = Schema(model);

module.exports = mongoose.model("contractedInstitution");