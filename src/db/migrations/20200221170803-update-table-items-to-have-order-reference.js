'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("items", ["order_id"], {
      type: "foreign key",
      name: "order_id_fkey",
      references: {
        table: "orders",
        field: "id"
      },
      onDelete: "CASCADE",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("items", ["order_id"], {
      type: "foreign key",
      name: "order_id_fkey",
      references: {
        table: "orders",
        field: "id"
      },
      onDelete: "CASCADE",
    })
  }
};
