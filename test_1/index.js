import express from 'express';
import router from './router.js';
import * as dotenv from 'dotenv';
import sequelize from './db/conn.js'
import Game from "./models/game-model.js";
import Deposit from "./models/deposit-model.js";
import User from "./models/user-model.js";




dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use('/api', router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
      app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
  } catch (e) {
      console.log(e);
  }
}

start();

