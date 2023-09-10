const express = require('express')
const app = express()
app.use(express.json())
require('dotenv').config()
const dbConfig = require('./config/dbConfig')
const port = process.env.PORT || 5000
const useRoute = require("./routes/useRoute")


app.use("/api/users", useRoute)

app.listen(port, () => { console.log(`We are listening Node/Express server on ${port}`) });
