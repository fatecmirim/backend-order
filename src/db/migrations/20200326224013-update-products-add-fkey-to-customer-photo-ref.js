'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("products", ["photo_id"], {
      type: "foreign key",
      name: "photo_id_fkey",
      references: {
        table: "photos",
        field: "id"
      },
      onDelete: "SET NULL",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("items", ["photo_id"]);
  }
};
