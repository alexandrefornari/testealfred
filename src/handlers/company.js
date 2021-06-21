const companyService = require('../services/company');

const getAllCompanies = async (req, res) => {
    if(req.body.name){
        getCompanyByName(req, res);
    }else{
        const companies = await companyService.getAll();

        //console.log(companies);

        res.json(companies);
    }
}

const getCompanyById = async (req, res) => {
    const company = await companyService.findById(req.params.id);

    //console.log(company);

    res.json(company);
}

const getCompanyByName = async (req, res) => {
    const company = await companyService.findByName(req.body.name);

    //console.log(company);

    res.json(company);
}

const createCompany = async (req, res) => {
    companyService.create(req.body)
    .then(company => {
        res.json(company)
    })
    .catch(error => {
        res.json(error)
    })
}

const deleteCompany = async (req, res) => {
    const company = await companyService.deleteById(req.params.id);

    //console.log(company);
    if(company){
        res.send('Company removida com sucesso');
    }else{
        res.status(500).send('Company não encontrada');
    }
}

module.exports = {
    getAllCompanies,
    getCompanyById,
    getCompanyByName,
    createCompany,
    deleteCompany
}