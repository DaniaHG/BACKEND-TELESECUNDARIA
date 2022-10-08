const express = require('express');
const router = express.Router();
const mysqlConnection = require('../configurations/db-conf');

/*--------------------------------------ALUMNOS------------------------------------------*/
/*Get-Alumnos*/
router.get('/alumnos',(req,res)=>{
    console.log('get lista alumnos')
    mysqlConnection.query('Select m.id, m.nombre, m.fecha_nacimiento, m.fecha_ingreso, m.direccion, m.telefono from alumnos',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Get-id-Persona*/
router.get('/alumnos/:id',(req,res)=>{
    console.log('get alumnos')
    mysqlConnection.query('Select m.id, m.nombre, m.fecha_nacimiento, m.fecha_ingreso, m.direccion, m.telefono from alumnos where id = ?',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});

router.post('/alumnos',(req,res)=>{
    console.log('Insert alumnos')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into alumnos (nombre, fecha_nacimiento, fecha_ingreso, direccion, telefono) values (?,?,?,?,?)',
    [emp.nombre,emp.fecha_nacimiento,emp.fecha_ingreso,emp.direccion,emp.telefono],(err,result)=>{
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
router.put('/alumnos/:id',(req,res)=>{
    console.log('Update alumnos')
    let emp=req.body;
    mysqlConnection.query('update alumnos set nombre=?, fecha_nacimiento=?, fecha_ingreso=?, direccion=?, telefono=? where id=?',
    [emp.nombre,emp.fecha_nacimiento,emp.fecha_ingreso,emp.direccion,emp.telefono,req.params.id],(err,result)=>{
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
router.delete('/alumnos/:id',(req,res)=>{
    console.log('Delete alumnos')
    mysqlConnection.query('delete from alumnos where id = ?',[req.params.id],(err,result)=>{
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