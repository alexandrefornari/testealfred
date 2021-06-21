'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'example@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        firstName: 'João',
        lastName: 'Silva',
        email: 'jsilva@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    await queryInterface.bulkInsert('companies', [
      {
        name: 'McDonalds',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'BK',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    const companies = await queryInterface.sequelize.query(
      `SELECT id from companies;`
    );

    console.log('company[0]: ', companies[0][0].id)
    console.log('company[1]: ', companies[0][1].id)

    await queryInterface.bulkInsert('projects', [
      {
        name: 'Amo muito tudo isso',
        companyId: companies[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Mega stacker',
        companyId: companies[0][1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    const users = await queryInterface.sequelize.query(
      `SELECT id from users;`
    );

    const projects = await queryInterface.sequelize.query(
      `SELECT id from projects;`
    );

    return await queryInterface.bulkInsert('statements', [
      {
        userId: users[0][0].id,
        projectId: projects[0][0].id,
        verb: 'comeu',
        object: 'bigmac',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        userId: users[0][1].id,
        projectId: projects[0][1].id,
        verb: 'jogou fora',
        object: 'mega stacker triplo',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('companies', null, {});
    await queryInterface.bulkDelete('projects', null, {});
    return await queryInterface.bulkDelete('statements', null, {});
  }
};
