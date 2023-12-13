const express = require('express')
const connectTOMongo = require('./db')
const cors = require('cors')

const app = express()
const port =  5000

app.use(cors())

// if we using req.body so first of all we compalsary use middle were
app.use(express.json())


app.use('/api/auth',require('./routes/auth'))
app.use('/api/note',require('./routes/note'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
connectTOMongo();

 