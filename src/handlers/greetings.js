const models = require('../models')

const index = (req, res) => {
    models.authenticate()
        .then(() => {
            res.send('Aplicação e conexão com o banco de dados funcionando.')
        })
        .catch(error => {
            res.send(error.message)
        })
}


module.exports = {
    index
}