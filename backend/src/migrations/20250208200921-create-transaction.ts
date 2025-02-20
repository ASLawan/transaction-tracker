// import { QueryInterface, DataTypes } from "sequelize";

// export default {
//   up: async (queryInterface: QueryInterface) => {
//     await queryInterface.createTable("transactions", {
//       id: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         allowNull: false,
//         primaryKey: true,
//       },
//       value: {
//         type: DataTypes.FLOAT,
//         allowNull: false,
//       },
//       timestamp: {
//         type: DataTypes.BIGINT,
//         allowNull: false,
//       },
//       receiver: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       confirmed: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//         defaultValue: false,
//       },
//       sender: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       createdAt: {
//         type: DataTypes.DATE,
//         allowNull: false,
//       },
//       updatedAt: {
//         type: DataTypes.DATE,
//         allowNull: false,
//       },
//     });
//   },

//   down: async (queryInterface: QueryInterface) => {
//     await queryInterface.dropTable("transactions");
//   },
// };

"use strict";

import { QueryInterface, DataTypes } from "sequelize";

// const { QueryInterface, DataTypes } = require("sequelize");

/** @param {QueryInterface} queryInterface */
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("transactions", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      value: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      receiver: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      sender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("transactions");
  },
};
