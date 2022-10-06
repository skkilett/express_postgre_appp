import sequelize from "../db/conn.js";
import { DataTypes } from "sequelize";


const Game = sequelize.define("allGames", {
    game_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true , unique: true },
    name: { type: DataTypes.STRING, unique: true },
    title: { type: DataTypes.STRING, unique: true },
    price: { type: DataTypes.FLOAT, unique: false },
    creator: { type: DataTypes.STRING, unique: false },
  });


export default Game;