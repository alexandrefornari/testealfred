const { project, company } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getAll = () => {
    return project.findAll({
        include:[
            { model: company }
        ]
    })
}

const create = data => {
    return project.create({
        ...data,
        //TO DO: colocar aqui a lógica do password
    })
}

const findByName = name => {
    return project.findAll({
        where: { 
            name: {
                [Op.iLike]: '%' + name + '%'
            }
        },
        include:[
            { model: company }
        ]
    })
}

const findById = id => {
    return project.findOne({
        where: { id },
        include:[
            { model: company }
        ]
    })
}

const findByCompanyId = companyId => {
    return project.findAll({
        where: { companyId },
        include:[
            { model: company }
        ]
    })
}

const deleteById = id => {
    return project.destroy({
        where: { id }
    })
}

module.exports = {
    getAll,
    create,
    findByName,
    findById,
    findByCompanyId,
    deleteById
}