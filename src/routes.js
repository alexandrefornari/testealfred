const express = require('express');
const router = express.Router();
const logger = require('morgan');

// handlers
const greetings = require('./handlers/greetings');
const users = require('./handlers/users');
const company = require('./handlers/company');
const project = require('./handlers/projects');
const statement = require('./handlers/statements');

router.use(logger('dev'));


router.get('/', greetings.index);

router.get('/users/:id', users.getUserById);
router.get('/users', users.getAllUsers);
router.post('/users', users.createUser);
router.delete('/users/:id', users.deleteUser);

router.get('/company/:id', company.getCompanyById);
router.get('/company', company.getAllCompanies);
router.post('/company', company.createCompany);
router.delete('/company/:id', company.deleteCompany);

router.get('/project/company/:id', project.getProjectsByCompanyId);
router.get('/project/:id', project.getProjectById);
router.get('/project', project.getAllProjects);
router.post('/project', project.createProject);
router.delete('/project/:id', project.deleteProject);

router.get('/statement/project/:id', statement.getProjectStatements);
router.get('/statement/user/:id', statement.getUserStatements);
router.get('/statement/:id', statement.getStatementById);
router.get('/statement', statement.getAllStatements);
router.post('/statement', statement.createStatement);
router.delete('/statement/:id', statement.deleteStatement);


module.exports = router;
