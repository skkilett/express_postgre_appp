import Game from "../models/game-model.js";
import User from "../models/user-model.js";

export default new class GameService {
  async createGame(name, title, price, creator, res) {
    try {
      const game = await Game.create({
        name: name,
        title: title,
        price: price,
        creator: creator,
      });
      if (game) {
        return res.json({
          status: "ok",
          game_id: game.game_id,
          message: "success",
          description: "Success",
        });
      }
    } catch (e) {
        console.log(e);
        return res.json({status:'failed', message: 'error', description: 'Not successful, unknown error'});
    }
  }

  async buyGame(gameId, username, res) {
    try {
      const game = await Game.findOne({ where: { game_id: gameId } });
      if (!game) {
        return res.json({
          status: "failed",
          message: "unknown",
          description: "Not successful, unknown game",
        });
      }
      const user = await User.findOne({ where: { username } });
      if (user.balance < game.price) {
        return res.json({
          status: "failed",
          message: "insufficient_funds",
          description: "Not successful, insufficient funds",
        });
      }
      const gameArray = user.games;
      gameArray.push(gameId);
      await User.update(
        {
          games: gameArray,
          balance: user.balance - game.price,
        },
        { where: { username: username } }
      );
      const updatedUser = await User.findOne({ where: { username } });
      const gameCreator = await User.findOne({
        where: { username: game.creator },
      });
      const transferMoneyToCreator = await User.update(
        { balance: gameCreator.balance + game.price },
        { where: { username: gameCreator.username } }
      );
      if (transferMoneyToCreator) {
        return res.json({
          status: "ok",
          game_id: gameId,
          balance: updatedUser.balance,
          message: "success",
          description: "Success",
        });
      }
    } catch (e) {
        console.log(e);
        return res.json({status:'failed', message: 'error', description: 'Not successful, unknown error'});
    }
  }
};
