

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
                 console.log('All data is there in request');
               }
             }
           }
         }
       }
     }
   })
   return router;
 }
