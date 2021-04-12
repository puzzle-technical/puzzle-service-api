require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors')
const bodyParser = require('body-parser');
const dbConn = require('./config/db.config');

const app = express();
const port = process.env.PORT || 3000;

app.use(fileUpload());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/api', async (req, res) => {
  var result = await dbConn.query("SHOW TABLES")
  .catch(err => console.log(err));
  res.json(result[0])
})


// routers

const userRoutes = require('./src/routes/user.routes');
app.use('/api/users', userRoutes);

const serviceRoutes = require('./src/routes/service.routes');
app.use('/api/services', serviceRoutes);

const categoryRoutes = require('./src/routes/category.routes');
app.use('/api/categories', categoryRoutes);

const budgetRoutes = require('./src/routes/budget.routes');
app.use('/api/budgets', budgetRoutes);

app.use('/', express.static('public'));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = app;