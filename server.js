require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors')
const dbConn = require('./config/db.config');

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(fileUpload());
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/api', async (req, res) => {
  var result = await dbConn.query("SHOW TABLES")
  .catch(err => console.log(err));
  res.json(result[0])
})

// routers

const adminRoutes = require('./src/routes/admin.routes');
app.use('/api/admin', adminRoutes);

const userRoutes = require('./src/routes/user.routes');
app.use('/api/users', userRoutes);

const serviceRoutes = require('./src/routes/service.routes');
app.use('/api/services', serviceRoutes);

const categoryRoutes = require('./src/routes/category.routes');
app.use('/api/categories', categoryRoutes);

const budgetRoutes = require('./src/routes/budget.routes');
app.use('/api/budgets', budgetRoutes);

const pointsRoutes = require('./src/routes/points.routes');
app.use('/api/points', pointsRoutes);

app.use('/', express.static('public'));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = app;