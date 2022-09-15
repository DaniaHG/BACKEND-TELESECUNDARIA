const express = require('express');
const router = express.Router();
const mysqlConnection = require('../configurations/db-conf');

/*---------------------------------------PERIODOS----------------------------------------*/
/*Get-PERIODOS*/
router.get('/periodos',(req,res)=>{
    console.log('get lista periodos')
    mysqlConnection.query('SELECT * FROM periodos;',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Get-id-periodos*/
router.get('/periodos/:id',(req,res)=>{
    console.log('get periodos')
    mysqlConnection.query('Select * from periodos where id = ?;',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Insert-Periodos*/
router.post('/periodos',(req,res)=>{
    console.log('Insert periodos')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into periodos (descripcion) values (?)',
    [emp.descripcion],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(201).send('created Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Update-Periodos*/
router.put('/periodos/:id',(req,res)=>{
    console.log('Update periodoss')
    let emp=req.body;
    mysqlConnection.query('update periodos set descripcion=? where id=?',
    [emp.descripcion,req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Updated Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Delete-Periodos*/
router.delete('/periodos/:id',(req,res)=>{
    console.log('Delete periodos')
    mysqlConnection.query('delete from periodos where id = ?',[req.params.id],(err,result)=>{
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