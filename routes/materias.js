const express = require('express');
const router = express.Router();
const mysqlConnection = require('../configurations/db-conf');

/*---------------------------------------MATERIAS----------------------------------------*/
/*Get-materias*/
router.get('/materias',(req,res)=>{
    console.log('get lista materias')
    mysqlConnection.query('select id, nombre from materias;',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Get-id-materias*/
router.get('/materias/:id',(req,res)=>{
    console.log('get materias')
    mysqlConnection.query('select id, nombre from materias where id = ?;',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Insert-materias*/
router.post('/materias',(req,res)=>{
    console.log('Insert materias')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into materias (nombre) values (?)',
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

/*Update-materias*/
router.put('/materias/:id',(req,res)=>{
    console.log('Update materias')
    let emp=req.body;
    mysqlConnection.query('update materias set nombre=? where id=?',
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

/*Delete-materias*/
router.delete('/materias/:id',(req,res)=>{
    console.log('Delete materias')
    mysqlConnection.query('delete from materias where id = ?',[req.params.id],(err,result)=>{
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