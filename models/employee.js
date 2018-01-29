var mongoose = require('mongoose');
mongoose.Promise=global.Promise;
const Schema = mongoose.Schema;
const employeeSchema = new Schema({
  employeeName: {type: String, required: true},
  employeeNumber: {type: Number, required: true},
  employeePassword: {type: String, required: true},
  employeeDesignation: {type: String, required: true},
  employeeServiceLine: {type: String, required: true},
  employeeRole: {type: String, required: true}
});
module.exports = mongoose.model('Employee',employeeSchema);
