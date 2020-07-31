const express = require("express")
const router = express.Router()


var knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'localhost',
      user : 'root',
      password : '',
      database : 'imso'
    }
  });

  router.get('/',async function(req,res){
    let row = await knex('tb_branch');
    res.send({
      status:true,
      branchs:row
    })
  })

module.exports = router