const express = require("express");
const router = express.Router();
var knex = require("knex")({
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        user: "imso",
        password: "P@$$w0rd",
        database: "imso",
    },
});

router.get("/", async function(req, res) {
    //   let rows = await knex("tb_fee").count({ price: "price", date: "created_at"});
    let rows = await knex("tb_fee").select("tb_fee.price as price", "tb_fee.created_at as date");
    //   res.send(rows);
    res.send(JSON.stringify(rows));
});

router.get("/month", async function(req, res) {
    let rows = await knex("tb_fee").sum("price as price").groupBy('price').orderBy('created_at', 'desc').select("created_at");
    res.send(JSON.stringify(rows));
});
router.get("/permonth", async function(req, res) {
    let rows = await knex("tb_fee").sum("price as price");
    res.send({ permonths: rows });
});

router.get("/year", async function(req, res) {
    let rows = await knex("tb_fee").sum("price as price").groupBy('price').select("created_at");
    res.send(JSON.stringify(rows));
});
router.get("/peryear", async function(req, res) {
    let rows = await knex("tb_fee").sum("price as price");
    res.send({ peryears: rows });
});

module.exports = router;