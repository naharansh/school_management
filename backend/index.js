const expres = require('express')
const dotenv = require('dotenv').config({ path: './config/config.env' })
const connections = require('./config/connection')
const cookies=require('cookie-parser')
const roles = require('./routes/roles')
const user = require('./routes/user')
const cors = require('cors')
const app = expres()
app.use(cors('*'))
app.use(expres.json())
app.use(cookies())
app.use('/api/roles', roles)
app.use('/api/user', user)
const PORT = 8080 || process.env.PORT

app.listen(PORT, async () => {
  try {
    await connections.authenticate();
    await connections.sync()
    console.log("tables are synced")
    console.log('Connection has been established successfully.');
    console.log("Server is started")
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

})
