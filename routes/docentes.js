const express = require('express');
const router = express.Router();
const mysqlConnection = require('../configurations/db-conf');

/*--------------------------------------DOCENTES------------------------------------------*/
/*Get-Docentes*/
router.get('/docentes',(req,res)=>{
    console.log('get lista docentes')
    mysqlConnection.query('Select * from docentes',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Get-id-Persona*/
router.get('/docentes/:id',(req,res)=>{
    console.log('get docente')
    mysqlConnection.query('Select * from docentes where id = ?',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});

router.post('/docentes',(req,res)=>{
    console.log('Insert docentes')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into docentes (dpi, nombre, fecha_nacimiento, fecha_ingreso, direccion, telefono, correo) values (?,?,?,?,?,?,?)',
    [emp.dpi,emp.nombre,emp.fecha_nacimiento,emp.fecha_ingreso,emp.direccion,emp.telefono,emp.correo],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(201).send('created Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Update-Persona*/
router.put('/docentes/:id',(req,res)=>{
    console.log('Update docentes')
    let emp=req.body;
    mysqlConnection.query('update docentes set dpi=?, nombre=?, fecha_nacimiento=?, fecha_ingreso=?, direccion=?, telefono=?, correo=? where id=?',
    [emp.dpi,emp.nombre,emp.fecha_nacimiento,emp.fecha_ingreso,emp.direccion,emp.telefono,emp.correo,req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Updated Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Delete-Persona*/
router.delete('/docentes/:id',(req,res)=>{
    console.log('Delete docentes')
    mysqlConnection.query('delete from docentes where id = ?',[req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Deleted Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

module.exports = router;