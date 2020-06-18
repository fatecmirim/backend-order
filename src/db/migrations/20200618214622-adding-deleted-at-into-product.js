'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'products',
      'deletedAt',{
        type: Sequelize.DATE
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('products', 'deletedAt');
  }
};
