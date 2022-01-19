const express = require('express')
const {vistaPrincipal, vistaEventos,
    vistaAdminEventos, vistaMeteo,
    vistaIcons} = require('../controllers/PageControllers')
const router = express.Router()

// Conectamos las request a los métodos del PageController
router.get('/home', vistaPrincipal)
router.get('/eventos', vistaEventos)
router.get('/adminEventos', vistaAdminEventos)
router.get('/meteo', vistaMeteo)
router.get('/icons', vistaIcons)

module.exports = {routes: router}