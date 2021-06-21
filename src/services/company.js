const { company } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getAll = () => {
    return company.findAll({})
}

const create = data => {
    return company.create({
        ...data,
        //TO DO: colocar aqui a lógica do password
    })
}

const findByName = name => {
    return company.findAll({
        where: { 
            name: {
                [Op.iLike]: '%' + name + '%'
            }
        }
    })
}

const findById = id => {
    return company.findOne({
        where: { id }
    })
}

const deleteById = id => {
    return company.destroy({
        where: { id }
    })
}

module.exports = {
    getAll,
    create,
    findByName,
    findById,
    deleteById
}