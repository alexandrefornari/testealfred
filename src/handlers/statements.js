const statementService = require('../services/statement');

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

const getAllStatements = async (req, res) => {
    if(req.body.verb){
        getStatementByVerb(req, res);
    }else{
        const projects = await statementService.getAll();

        res.json(projects);
    }
}

const getStatementById = async (req, res) => {
    const project = await statementService.findById(req.params.id);

    res.json(project);

}

const getStatementByVerb = async (req, res) => {
    const project = await statementService.findByVerb(req.body.verb);

    res.json(project);
}

const createStatement = async (req, res) => {
    statementService.create(req.body)
    .then(statement => {
        res.json(statement)
    })
    .catch(error => {
        res.json(error)
    })
}

const deleteStatement = async (req, res) => {
    const project = await statementService.deleteById(req.params.id);

    //console.log(project);
    if(project){
        res.send('Projeto removido com sucesso');
    }else{
        res.status(500).send('Projeto não encontrado');
    }
}

const getProjectStatements = async (req, res) => {
    const projects = await statementService.findByProject(req.params.id);

    res.json(projects);
}

const getUserStatements = async (req, res) => {
    const projects = await statementService.findByUser(req.params.id);

    res.json(projects);
}

module.exports = {
    getAllStatements,
    getStatementById,
    getStatementByVerb,
    createStatement,
    deleteStatement,
    getProjectStatements,
    getUserStatements
}