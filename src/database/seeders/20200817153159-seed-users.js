'use strict'

const { generatePassword } = require('../../presenters/password')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    await queryInterface.bulkInsert('Users', [
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        name: 'Administrator',
        email: 'admin@painelsenha.com.br',
        password: generatePassword('123123123'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        name: 'Higor Diego',
        email: 'higor.diego@painelsenha.com.br',
        password: generatePassword('123123123'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        name: 'Jardel Matias',
        email: 'jardel.matias@painelsenha.com.br',
        password: generatePassword('123123123'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        name: 'Antonio Junior',
        email: 'antonio.junior@painelsenha.com.br',
        password: generatePassword('123123123'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
