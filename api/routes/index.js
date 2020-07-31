const express = require("express")
const router = express.Router()
router.use('/branch',require("./branch"));
router.use('/fee',require("./fee"));

module.exports = router