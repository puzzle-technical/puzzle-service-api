const mysql = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const dbConn = require('./config/db.config');


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/api', (req, res) => {
  dbConn.query("SHOW TABLES", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});


// routers

const userRoutes = require('./src/routes/user.routes');
app.use('/api/users', userRoutes);

const providerRoutes = require('./src/routes/provider.routes');
app.use('/api/providers', providerRoutes);








app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = app;