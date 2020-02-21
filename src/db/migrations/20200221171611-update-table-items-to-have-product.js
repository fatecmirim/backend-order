'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("items", ["product_id"], {
      type: "foreign key",
      name: "product_id_fkey",
      references: {
        table: "products",
        field: "id"
      },
      onDelete: "SET NULL",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("items", ["product_id"], {
      type: "foreign key",
      name: "product_id_fkey",
      references: {
        table: "products",
        field: "id"
      },
      onDelete: "SET NULL",
    })
  }
};
