'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("orders", ["customer_id"], {
      type: "foreign key",
      name: "customer_id_fkey",
      references: {
        table: "customers",
        field: "id"
      },
      onDelete: "SET NULL",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("orders", ["customer_id"]);
  }
};

