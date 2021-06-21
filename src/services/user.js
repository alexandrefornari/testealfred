const { user } = require('../models');

const getAll = () => {
    return user.findAll({})
}

const create = data => {
    return user.create({
        ...data,
        //TO DO: colocar aqui a lógica do password
    })
}

const findByEmail = email => {
    return user.findOne({
        where: { email }
    })
}

const findById = id => {
    return user.findOne({
        where: { id }
    })
}

const deleteById = id => {
    return user.destroy({
        where: { id }
    })
}

module.exports = {
    getAll,
    create,
    findByEmail,
    findById,
    deleteById
}