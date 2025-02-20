import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../config/conn";

class Transaction extends Model<
  InferAttributes<Transaction>,
  InferCreationAttributes<Transaction>
> {
  public id!: string;
  public value!: number;
  public timestamp!: number;
  public receiver!: string;
  public confirmed!: boolean;
  public sender!: string;
}

// Initialize the model
Transaction.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Generates a unique ID automatically
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
      defaultValue: false, // Defaults to false
    },
    sender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "transactions",
    timestamps: true, // Automatically creates `createdAt` and `updatedAt` fields
  }
);

// Export the model
export default Transaction;
