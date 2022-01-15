const express = require('express')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')

const app = express()

// Configuramos ejs como motor de plantillas
app.set('view engine', 'ejs')
app.use(expressLayouts)

// Especificamos public como la carpeta que contiene los archivos estáticos
app.use(express.static(path.join(__dirname, 'public')))

// Utilizamos el router
const myRouter = require('./routes/router')
app.use(myRouter.routes)

app.listen(3000, () => {
    console.log('Server up running in http://localhost:3000')
})