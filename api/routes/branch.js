const express = require("express")
const router = express.Router()


var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: "127.0.0.1",
        user: "imso",
        password: "P@$$w0rd",
        database: "imso",
    }
});

router.get('/', async function(req, res) {
    let row = await knex('tb_branch');
    res.send({
        status: true,
        branchs: row
    })
})

module.exports = router