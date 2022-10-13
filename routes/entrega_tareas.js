const express = require('express');
const router = express.Router();
const mysqlConnection = require('../configurations/db-conf');

/*---------------------------------------ENTREGA TAREAS----------------------------------------*/
/*Get-ENTREGA TAREAS*/
router.get('/entrega_tareas',(req,res)=>{
    console.log('get lista ENTREGA TAREAS')
    mysqlConnection.query('select entrega_tareas.id, entrega_tareas.status, alumnos_id, tareas_id from entrega_tareas, alumnos, tareas where entrega_tareas.alumnos_id = alumnos.id and entrega_tareas.tareas_id = tareas.id ORDER BY entrega_tareas.id;',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Get-id-ENTREGA TAREAS*/
router.get('/entrega_tareas/:id',(req,res)=>{
    console.log('get ENTREGA TAREAS')
    mysqlConnection.query('select entrega_tareas.id, entrega_tareas.status, alumnos_id, tareas_id from entrega_tareas, alumnos, tareas where entrega_tareas.alumnos_id = alumnos.id and entrega_tareas.tareas_id = tareas.id and entrega_tareas.id =?;',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Insert-ENTREGA TAREAS*/
router.post('/entrega_tareas',(req,res)=>{
    console.log('Insert ENTREGA TAREAS')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('INSERT INTO entrega_tareas (status, alumnos_id, tareas_id) VALUES (?, ?, ?);',
    [emp.nombre],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(201).send('created Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Update-ENTREGA TAREAS*/
router.put('/entrega_tareas/:id',(req,res)=>{
    console.log('Update ENTREGA TAREAS')
    let emp=req.body;
    mysqlConnection.query('UPDATE entrega_tareas SET status = ?, alumnos_id = ?,tareas_id = ? WHERE (id = ?);',
    [emp.nombre,req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Updated Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Delete-ENTREGA TAREAS*/
router.delete('/entrega_tareas/:id',(req,res)=>{
    console.log('Delete ENTREGA TAREAS')
    mysqlConnection.query('delete from entrega_tareas where id = ?;',[req.params.id],(err,result)=>{
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