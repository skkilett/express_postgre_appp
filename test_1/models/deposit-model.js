import sequelize from "../db/conn.js";
import { DataTypes } from "sequelize";


const Deposit = sequelize.define("deposits", {
    deposit_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true },
    username: { type: DataTypes.STRING, unique: false },
    amount: { type: DataTypes.FLOAT, unique: false },
  });


export default Deposit;