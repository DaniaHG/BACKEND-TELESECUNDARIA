const express = require('express');
const router = express.Router();
const mysqlConnection = require('../configurations/db-conf');


const jwt = require('jsonwebtoken');


router.get('', (req,res)=>{
  mysqlConnection.query('select * from usuarios', (err,rows,fields) => {
    if(!err){
      res.json(rows);
    }else{
      console.log(err);
    }
  })
});

router.post('', (req,res) => {
  const { userName,pass } = req.body;
  mysqlConnection.query('select userName, roleId from usuarios where userName=? and pass =?  ',
  [userName,pass],
  (err,rows,fields) => {
    if(!err){
      if(rows.length >0){
        let data = JSON.stringify(rows[0]);
        const token = jwt.sign(data, 'stil');
        res.json({token});
      }else{
        res.json('Usuario o clave incorrectos');
      }
      
    }else{
      console.log(err);
    }
  }
  )
})

router.post('',verifyToken, (req,res) => {
  res.json('Informacion secreta');
})

function verifyToken(req,res, next){
  if(!req.headers.authorization) return res.status(401).json('No autorizado');

  const token = req.headers.authorization.substr(7);
  if(token!==''){
    const content = jwt.verify(token,'stil');
    req.data = content;
    next();
  }else{
    res.status(401).json('Token vacio');
  }

}


module.exports = router;