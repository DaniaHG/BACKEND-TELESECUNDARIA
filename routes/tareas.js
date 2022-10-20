const express = require('express');
const router = express.Router();
const mysqlConnection = require('../configurations/db-conf');

/*---------------------------------------TAREAS----------------------------------------*/
/*Get-tareas*/
router.get('/tareas',(req,res)=>{
    console.log('get lista tareas')
    mysqlConnection.query('select t.id, t.fecha, t.nombre, t.descripcion, t.materias_id, m.nombre as materia, m.grado as grado, m.seccion as seccion, t.periodos_id, p.descripcion as periodo from dte0g8247tlcbkvs.tareas t  join dte0g8247tlcbkvs.materias m on m.id = t.materias_id join dte0g8247tlcbkvs.periodos p on p.id = t.periodos_id;',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Get-id-tareas*/
router.get('/tareas/:id',(req,res)=>{
    console.log('get tareas')
    mysqlConnection.query('select t.id, t.fecha, t.nombre, t.descripcion, t.materias_id, m.nombre as materia, m.grado as grado, m.seccion as seccion, t.periodos_id, p.descripcion as periodo from dte0g8247tlcbkvs.tareas t  join dte0g8247tlcbkvs.materias m on m.id = t.materias_id join dte0g8247tlcbkvs.periodos p on p.id = t.periodos_id  where t.id = ?;',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Insert-tareas*/
router.post('/tareas',(req,res)=>{
    console.log('Insert tareas')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('INSERT INTO tareas (fecha, nombre, descripcion, materias_id, periodos_id) VALUES (?, ?, ?, ?, ?);',
    [emp.fecha, emp.nombre, emp.descripcion, emp.materias_id, emp.periodos_id],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(201).send('created Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Update-tareas*/
router.put('/tareas/:id',(req,res)=>{
    console.log('Update tareas')
    let emp=req.body;
    mysqlConnection.query('UPDATE tareas SET  fecha = ?, nombre = ?, descripcion = ?, materias_id = ?, periodos_id = ? WHERE id = ?;',
    [emp.fecha, emp.nombre, emp.descripcion, emp.materias_id, emp.periodos_id,req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Updated Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Delete-tareas*/
router.delete('/tareas/:id',(req,res)=>{
    console.log('Delete tareas')
    mysqlConnection.query('delete from tareas where id = ?',[req.params.id],(err,result)=>{
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