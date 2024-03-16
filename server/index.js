const express = require('express');
const app = express();
const db = require('./models')
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routers
const klijentRouter = require('./routes/Klijent');
app.use("/klijent", klijentRouter);


const stanRouter = require('./routes/Stan');
app.use("/stan", stanRouter);

const lobiRouter = require('./routes/Lobi');
app.use("/lobi", lobiRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Server running in port 3001')
    });
});

