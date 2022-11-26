'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
 

  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      firstName: {
        type: Sequelize.STRING(50)
      },
      lastName: {
        type: Sequelize.STRING(50)
      },
      email: {
        type: Sequelize.STRING(50)
      },
      date_of_birth:{
        type:Sequelize.STRING,
      },
      password:{
        type:Sequelize.STRING(50)
      },
      model:{
        type:Sequelize.STRING(50)
      },
      version:{
        type:Sequelize.STRING(50)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};