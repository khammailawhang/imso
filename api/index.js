const express = require('express')
const app = express()
    // const bodyParser = require('body-parser')
    // set up port
const PORT = 4000
    // app.use(bodyParser.json({limit: '1000000mb'}));
app.use('/api', require('./routes/'));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));