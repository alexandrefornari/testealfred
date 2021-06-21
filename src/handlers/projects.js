const projectsService = require('../services/project');

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

const getAllProjects = async (req, res) => {
    if(req.body.name){
        getProjectByName(req, res);
    }else{
        const projects = await projectsService.getAll();

        res.json(projects);
    }
}

const getProjectsByCompanyId = async (req, res) => {
    const project = await projectsService.findByCompanyId(req.params.id);

    res.json(project);
}

const getProjectById = async (req, res) => {
    const project = await projectsService.findById(req.params.id);

    res.json(project);

}

const getProjectByName = async (req, res) => {
    const project = await projectsService.findByName(req.body.name);

    res.json(project);
}

const createProject = async (req, res) => {
    projectsService.create(req.body)
    .then(project => {
        res.json(project)
    })
    .catch(error => {
        res.json(error)
    })
}

const deleteProject = async (req, res) => {
    const project = await projectsService.deleteById(req.params.id);

    //console.log(project);
    if(project){
        res.send('Projeto removido com sucesso');
    }else{
        res.status(500).send('Projeto não encontrado');
    }
}

module.exports = {
    getAllProjects,
    getProjectById,
    getProjectByName,
    createProject,
    deleteProject,
    getProjectsByCompanyId
}