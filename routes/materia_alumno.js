const express = require('express');
const router = express.Router();
const mysqlConnection = require('../configurations/db-conf');

/*---------------------------------------MATERIA ALUMNO----------------------------------------*/
/*Get-materia-alumno*/
router.get('/materia_alumno',(req,res)=>{
    console.log('get lista materia-alumno')
    mysqlConnection.query('select a.id, a.status, a.materias_id, b.nombre as materia, a.alumnos_id, c.nombre as alumno, e.nombre as docente from dte0g8247tlcbkvs.materia_alumno a join dte0g8247tlcbkvs.materias b on b.id = a.materias_id join dte0g8247tlcbkvs.alumnos c on c.id = a.alumnos_id join dte0g8247tlcbkvs.docentes e on e.id = b.docentes_id;',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Get-id-materias-alumno*/
router.get('/materia_alumno/:id',(req,res)=>{
    console.log('get materia-alumno')
    mysqlConnection.query('select a.id, a.status, a.materias_id, b.nombre as materia, a.alumnos_id, c.nombre as alumno, e.nombre as docente from dte0g8247tlcbkvs.materia_alumno a join dte0g8247tlcbkvs.materias b on b.id = a.materias_id join dte0g8247tlcbkvs.alumnos c on c.id = a.alumnos_id join dte0g8247tlcbkvs.docentes e on e.id = b.docentes_id where a.id = ?;',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Insert-materia-alumno*/
router.post('/materia_alumno',(req,res)=>{
    console.log('Insert materia-alumno')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into materia_alumno (status, materias_id, alumnos_id) values (?,?,?)',
    [emp.status,emp.materias_id, emp.alumnos_id],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(201).send('created Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Update-materia-alumno*/
router.put('/materia_alumno/:id',(req,res)=>{
    console.log('Update materia-alumno')
    let emp=req.body;
    mysqlConnection.query('update materia_alumno set status=?, materias_id=?, alumnos_id=? where id=?',
    [emp.status,emp.materias_id,emp.alumnos_id,req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Updated Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Delete-materia-alumno*/
router.delete('/materia_alumno/:id',(req,res)=>{
    console.log('Delete materia-alumno')
    mysqlConnection.query('delete from materia_alumno where id = ?',[req.params.id],(err,result)=>{
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