'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("customer_orders", ["customer_id"], {
      type: "foreign key",
      name: "customer_id_fkey",
      references: {
        table: "customers",
        field: "id"
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE"
    }).then(() => {
      return queryInterface.addConstraint("customer_orders", ["order_id"], {
        type: "foreign key",
        name: "order_id_fkey",
        references: {
          table: "orders",
          field: "id"
        },
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("customer_orders", ["customer_id"], {
      type: "foreign key",
      name: "customer_id_fkey",
      references: {
        table: "customers",
        field: "id"
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE"
    }).then(() => {
      return queryInterface.removeConstraint("customer_orders", ["order_id"], {
        type: "foreign key",
        name: "order_id_fkey",
        references: {
          table: "orders",
          field: "id"
        },
      });
    });
  }
};
