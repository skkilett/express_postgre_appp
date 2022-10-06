import UserService from "./service/user-service.js"
import RefillService from "./service/refill-service.js"
import RefundService from "./service/refund-service.js"
import GameService from "./service/game-service.js"


export default new class AppController{
  async registration(req, res){ 
    try {
      const {username, password} = req.body;
      return await UserService.registration(username, password, res);
    } catch (e) {
      console.log(e);
      return res.json({status:'failed', message: 'error', description: 'Not successful, unknown error'});
    }
  }

  async login(req, res){ 
    try {
      const {username, password} = req.body;
      console.log(username);
      return await UserService.login(username, password, res);
    } catch (e) {
      console.log(e);
      return res.json({status:'failed', message: 'error', description: 'Not successful, unknown error'});
    }
  }

  async refill(req, res){
    try {
      const {username, amount} = req.body;
      return await RefillService.refill(username, amount, res);
    } catch (e) {
      console.log(e);
      return res.json({status:'failed', message: 'error', description: 'Not successful, unknown error'});
    }
  }
  async refund(req, res) {
    try {
      const depositId = req.body.deposit_id;
      return await RefundService.refund(depositId, res);
    } catch (e) {
      console.log(e);
      return res.json({status:'failed', message: 'error', description: 'Not successful, unknown error'});
    }
  }

  async createGame(req, res) {
    try {
      const {name, title, price} = req.body;
      const creator = req.user.username;
      return await GameService.createGame(name, title, price, creator, res);
    } catch (e) {
      console.log(e);
      return res.json({status:'failed', message: 'error', description: 'Not successful, unknown error'});
    }
  }

  async buyGame(req, res) {
    try {
      const gameId = req.body.game_id;
      const username = req.user.username;
      return await GameService.buyGame(gameId, username, res);
    } catch (e) {
      console.log(e);
      return res.json({status:'failed', message: 'error', description: 'Not successful, unknown error'});
    }
  }

}