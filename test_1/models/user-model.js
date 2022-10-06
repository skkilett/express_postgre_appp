import sequelize from "../db/conn.js";
import { DataTypes } from "sequelize";
import Game from "./game-model.js";
import Deposit from "./deposit-model.js";


const User = sequelize.define("users", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true },
  username: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING, unique: false },
  games: { type: DataTypes.ARRAY(DataTypes.INTEGER), unique: false, defaultValue: [], },
  balance: { type: DataTypes.FLOAT, unique: false, defaultValue: 0 },
});


User.hasMany(Game);
Game.belongsTo(User);

User.hasMany(Deposit);
Deposit.belongsTo(User);

export default User;