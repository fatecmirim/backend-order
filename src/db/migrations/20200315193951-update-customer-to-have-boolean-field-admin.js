'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('customers', 'admin', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
   });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('customers', 'admin');
  }
};
