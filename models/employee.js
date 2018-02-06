var mongoose = require('mongoose');
mongoose.Promise=global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
let employeeNameLengthValidate = (employeeName) => {
    if(!employeeName){
        return false;
    } else{
        if(employeeName.length < 5 || employeeName.length >30 ){
            return false;
        } else {
            true;
        }
    }
};

let employeeNameValidate = (employeeName) => {
  if(!employeeName) return false;
  else{
    const regex = new RegExp(/^[a-zA-Z0-9]+$/);
    return regex.test(employeeName);
  }
}

const employeeNameValidators= [{
    validator : employeeNameLengthValidate,
    message : "Employee Name must be atleast 5 or less than 30"
},
{
  validator: employeeNameValidate,
  message: 'Enter a valid Employee Name'
}
]
// for employeeNumber
let employeeNumberLengthValidate = (employeeNumber) => {
    if(!employeeNumber){
        return false;
    } else{
        if(employeeNumber.length < 6 || employeeNumber.length >8 ){
            return false;
        } else {
            true;
        }
    }
};
let employeeNumberValidate = (employeeNumber) => {
  if(!employeeNumber) return false;
  else{
    const regex = new RegExp(/^[0-9]+$/);
    return regex.test(employeeNumber);
  }
}

const employeeNumberValidators= [{
    validator : employeeNumberLengthValidate,
    message : "Employee Number must be atleast 6 or less than 8"
},
{
  validator : employeeNumberValidate,
  message: 'Enter a valid Employee Number'
}
]
//for employeePassword
let employeePasswordLengthValidate = (employeePassword) => {
    if(!employeePassword){
        return false;
    } else{
        if(employeePassword.length < 8 || employeePassword.length >30 ){
            return false;
        } else {
            true;
        }
    }
};

const employeePasswordValidators= [{
    validator : employeePasswordLengthValidate,
    message : "Employee Password must be atleast 8 or less than 30"
},
]
//for employeeServiceLine
let employeeServiceLineLengthValidate = (employeeServiceLine) => {
    if(!employeeServiceLine){
        return false;
    } else{
        if(employeeServiceLine.length < 2 || employeeServiceLine.length >30 ){
            return false;
        } else {
            true;
        }
    }
};

const employeeServiceLineValidators= [{
    validator : employeeServiceLineLengthValidate,
    message : "Employee ServiceLine must be atleast 2 or less than 30"
},
]
//for employeeDesignation
let employeeDesignationLengthValidate = (employeeDesignation) => {
    if(!employeeDesignation){
        return false;
    } else{
        if(employeeDesignation.length < 2 || employeeDesignation.length >30 ){
            return false;
        } else {
            true;
        }
    }
};

const employeeDesignationValidators= [{
    validator : employeeDesignationLengthValidate,
    message : "Employee Designation must be atleast 2 or less than 30"
},
]
// for employeeRole
let employeeRoleLengthValidate = (employeeRole) => {
    if(!employeeRole){
        return false;
    } else{
        if(employeeRole.length < 5 || employeeRole.length >30 ){
            return false;
        } else {
            true;
        }
    }
};

const employeeRoleValidators= [{
    validator : employeeRoleLengthValidate,
    message : "Employee Role must be atleast 5 or less than 30"
},
]
const employeeSchema = new Schema({
  employeeName: {type: String, required: true,unique: true, validate: employeeNameValidators},
  employeeNumber: {type: Number, required: true, validate: employeeNumberValidators},
  employeePassword: {type: String, required: true, validate: employeePasswordValidators},
  employeeDesignation: {type: String, required: true, validate: employeeDesignationValidators},
  employeeServiceLine: {type: String, required: true, validate: employeeServiceLineValidators},
  employeeRole: {type: String, required: true, validate: employeeRoleValidators}
});
employeeSchema.pre('save', function(next) {
  if(!this.isModified('employeePassword'))
    return next();

  bcrypt.hash(this.employeePassword,null,null,(err,hash) =>{
    if(err) return next(err);

    this.employeePassword=hash;
    next();
  })
});

  employeeSchema.methods.comparePassword=function(password){
      return bcrypt.compareSync(password,this.employeePassword);
  };

module.exports = mongoose.model('Employee',employeeSchema);
