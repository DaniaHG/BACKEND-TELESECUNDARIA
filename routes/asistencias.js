const express = require('express');
const router = express.Router();
const mysqlConnection = require('../configurations/db-conf');

/*--------------------------------------asistencias------------------------------------------*/
/*Get-Asistencias*/
router.get('/asitencias',(req,res)=>{
    console.log('get lista asistencias')
    mysqlConnection.query('SELECT  asistencias.id, fecha, asistencias.status, alumnos_id, nombre FROM asistencias INNER JOIN alumnos ON asistencias.alumnos_id = alumnos.id',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Get-id-Asistencias*/
router.get('/asistencias/:id',(req,res)=>{
    console.log('get asistencias')
    mysqlConnection.query('SELECT id, fecha, status, alumnos_id FROM asistencias where id = ?',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});

router.post('/asistencias',(req,res)=>{
    console.log('Insert asistencias')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into asistencias (fecha, status, alumnos_id) VALUES (?,?,?)',
    [emp.fecha,emp.status,emp.alumnos_id],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(201).send('created Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Update-Asistencias*/
router.put('/asistencias/:id',(req,res)=>{
    console.log('Update asistencias')
    let emp=req.body;
    mysqlConnection.query('update asistencias set fecha=?, status=?, alumnos_id=?, where id=?',
    [emp.fecha,emp.status,emp.alumnos_id,req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Updated Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Delete-Asistencias*/
router.delete('/asistencias/:id',(req,res)=>{
    console.log('Delete asistencias')
    mysqlConnection.query('delete from asistencias where id = ?',[req.params.id],(err,result)=>{
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