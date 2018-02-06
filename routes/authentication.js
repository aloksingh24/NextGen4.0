var mongoose = require('mongoose');
const Employee = require('../models/employee');
const jwt = require('jsonwebtoken');
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
                     if(err.code === 11000){
                       res.json({success: false, message: 'Employee Name already exists'});
                     }
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

   router.get('/dashboard', (req,res) => {

      let emp = mongoose.model('Employee');
      emp.find({},function(err,doc){
          if(err){
            res.send(err);
          } else {
            res.send(doc);
          }
      })

   })

   //check for UserName
     router.get('/checkemployeeName/:employeeName',(req,res) => {
         if(!req.params.employeeName){
             res.json({ success: false, message: 'Please provide a Employee Name'});
         } else{
             Employee.findOne({ userName: req.params.employeeName},(err,emp) => {
                 if(err){
                     res.json({ success: false, message: err });
                 } else {
                     if(emp){
                         res.json({ success: false, message: 'Employee Name is already taken' });
                     } else{
                         res.json({ success: true, message: 'Employee Name is available'});
                     }

                 }
             })
         }
     });

     // Login
     router.post('/login', (req,res) =>{
       if(!req.body.employeeNumber){
         res.json({success: false, message: 'Employee Number is required'});
       } else{
         if(!req.body.employeePassword){
           res.json({success: false, message: 'Employee Password is required'});
         } else{
           Employee.findOne({ employeeNumber: req.body.employeeNumber}, (err,emp) =>{
             if(err){
               res.json({success: false, message: err});
             }else{
               if(!emp){
                 res.json({success: false, message: 'Employee not found'});
               }else{
                 const isValidPassword = emp.comparePassword(req.body.employeePassword);
                 if(!isValidPassword){
                   res.json({success:false, message: 'Invalid Password'});
                 }else{
                   const token = jwt.sign({userId: emp._id}, config.secert, {expiresIn: '24h' });
                   res.json({ success: true, message: 'Success !!', token: token, emp: {employeeName: emp.employeeName} });
                 }
               }
             }
           });
         }
       }
     });

   return router;
 }
