const express = require('express')
const app = express()
app.use(express.json())
require('dotenv').config()
const dbConfig = require('./config/dbConfig')
const port = process.env.PORT || 5000
const useRoute = require("./routes/useRoute")
const productRoute = require("./routes/productsRoute")

app.use("/api/users", useRoute)
app.use("api/products", productRoute)

app.listen(port, () => { console.log(`We are listening Node/Express server on ${port}`) });
