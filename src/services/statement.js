const { statement, project, user } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getAll = () => {
    return statement.findAll({
        include:[
            { model: project },
            { model: user }
        ]
    })
}

const create = data => {
    return statement.create({
        ...data,
        //TO DO: colocar aqui a lógica do password
    })
}

const findByVerb = verb => {
    return statement.findAll({
        where: { 
            verb: {
                [Op.iLike]: '%' + verb + '%'
            }
        },
        include:[
            { model: project },
            { model: user }
        ]
    })
}

const findById = id => {
    return statement.findOne({
        where: { id },
        include:[
            { model: project },
            { model: user }
        ]
    })
}

const findByProject = projectId => {
    return statement.findAll({
        where: { projectId },
        include:[
            { model: project },
            { model: user }
        ]
    })
}

const findByUser = userId => {
    return statement.findAll({
        where: { userId },
        include:[
            { model: project },
            { model: user }
        ]
    })
}

const deleteById = id => {
    return statement.destroy({
        where: { id }
    })
}

module.exports = {
    getAll,
    create,
    findByVerb,
    findById,
    findByProject,
    findByUser,
    deleteById
}