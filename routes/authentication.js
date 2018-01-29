const Employee = require('../models/employee');
const config = require('../config/db.js');
 module.exports=(router)=>{
   router.post('/register', (req,res) => {
     //req.body.employeeName
     //req.body.employeeNumber
     //req.body.employeePassword
     //req.body.employeeDesignation
     //req.body.employeeServiceLine
     //req.body.employeeRole
     if(!req.body.employeeName){
       res.json( {success: false, message: 'Employee Name is required'} );
     } else{
       if(!req.body.employeeNumber){
         res.json( {success: false, message: 'Employee Number is required'} );
       } else{
         if(!req.body.employeePassword){
           res.json( {success:false, message: 'Employee Password is required'} );
         } else{
           if(!req.body.employeeDesignation){
             res.json( {success:false, message: 'Employee Designation is required'} );
           } else{
             if(!req.body.employeeServiceLine){
               res.json( {success: false, message: 'Employee Service Line is required'} );
             } else{
               if(!req.body.employeeRole){
                 res.json( {success: false, message: 'Employee Role is required'} );
               } else{
                 let employee = new Employee({
                   employeeName: req.body.employeeName,
                   employeeNumber: req.body.employeeNumber,
                   employeePassword: req.body.employeePassword,
                   employeeDesignation: req.body.employeeDesignation,
                   employeeServiceLine: req.body.employeeServiceLine,
                   employeeRole: req.body.employeeRole
                 });
                 employee.save( (err) =>{
                   if(err){
                     if(err.errors){
                       if(err.errors.employeeName){
                         res.json( {success: false, message: err.errors.employeeName.message} );
                       } else {
                         if(err.errors.employeeNumber){
                            res.json( {success: false, message: err.errors.employeeNumber.message} );
                         } else {
                           if(err.errors.employeePassword){
                              res.json( {success: false, message: err.errors.employeePassword.message} );
                           } else {
                             if(err.errors.employeeDesignation){
                                res.json( {success: false, message: err.errors.employeeDesignation.message} );
                             } else {
                               if(err.errors.employeeServiceLine){
                                  res.json( {success: false, message: err.errors.employeeServiceLine.message} );
                               } else {
                                 if(err.errors.employeeRole){
                                    res.json( {success: false, message: err.errors.employeeRole.message} );
                                 } else {
                                   res.json( {success: false, message: err} );
                                 }
                               }
                             }
                           }
                         }
                       }
                     } else {
                       res.json( {success: false,message: 'Could not save Employee', err} );
                     }
                   } else{
                     res.json( {success: true,message: 'Employee Record Created !'} );
                   }
                 })
               }
             }
           }
         }
       }
     }
   })
   return router;
 }
