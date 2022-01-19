
// Al estar en el directorio views, no hace falta indicar la carpeta
const vistaPrincipal = (req, res) => {
    res.render('home')
}

const vistaIcons = (req, res) => {
    res.render('icons')
}

const vistaEventos = (req, res) => {
    res.render('eventos')
}

const vistaAdminEventos = (req, res) => {
    res.render('adminEventos')
}

const vistaMeteo = (req, res) => {
    res.render('meteo')
}

module.exports = {
    vistaPrincipal,
    vistaEventos,
    vistaAdminEventos,
    vistaMeteo,
    vistaIcons
}