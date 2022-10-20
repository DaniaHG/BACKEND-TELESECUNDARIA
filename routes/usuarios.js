const express = require('express');
const router = express.Router();
const mysqlConnection = require('../configurations/db-conf');

/*---------------------------------------USUARIOS----------------------------------------*/
/*Get-usuarios*/
router.get('/usuarios',(req,res)=>{
    console.log('get lista usuarios')
    mysqlConnection.query('SELECT id, userName, pass, roleId FROM usuarios;',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Get-id-usuarios*/
router.get('/usuarios/:id',(req,res)=>{
    console.log('get usuarios')
    mysqlConnection.query('SELECT id, userName, pass, roleId FROM usuarios where id = ?;',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*Insert-usuarios*/
router.post('/usuarios',(req,res)=>{
    console.log('Insert usuarios')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into usuarios (userName, pass, roleId) values (?,?,?)',
    [emp.userName,emp.pass,emp.roleId],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(201).send('created Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Update-usuarios*/
router.put('/usuarios/:id',(req,res)=>{
    console.log('Update usuarios')
    let emp=req.body;
    mysqlConnection.query('update usuarios set userName=?, pass=?, roleId=? where id=?',
    [emp.userName,emp.pass,emp.roleId,req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Updated Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*Delete-usuarios*/
router.delete('/usuarios/:id',(req,res)=>{
    console.log('Delete usuarios')
    mysqlConnection.query('delete from usuarios where id = ?',[req.params.id],(err,result)=>{
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