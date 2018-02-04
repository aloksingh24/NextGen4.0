var mongoose = require('mongoose');
mongoose.Promise=global.Promise;
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
const employeeSchema = new Schema({
  employeeName: {type: String, required: true},
  employeeNumber: {type: Number, required: true},
  employeePassword: {type: String, required: true},
  employeeDesignation: {type: String, required: true},
  employeeServiceLine: {type: String, required: true},
  employeeRole: {type: String, required: true}
});
employeeSchema.pre('save', function(next) {
  if(!this.isModified('employeePassword')){
    return next();
  }
  bcrypt.hash(this.employeePassword,null,null,(err,hash) =>{
    if(err){
      return next(err);
    }
    this.password=hash;
    next();
  })
});

  employeeSchema.methods.comparePassword=function(password){
      return bcrypt.compareSync(password,this.password);
  };

module.exports = mongoose.model('Employee',employeeSchema);
