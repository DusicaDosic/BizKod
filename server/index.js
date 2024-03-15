const express = require('express');
const app = express();
const db = require('./models')
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
// Routers
const klijentRouter = require('./routes/klijent');
app.use("/klijent", klijentRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Server running in port 3001')
    });
});

