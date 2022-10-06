import * as bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import User from '../models/user-model.js';

export default new class UserService{
  async registration (username, password, res){
    try {
      const candidate = await User.findOne({where: {username}});
      if (candidate) {
        return res.json({status:'failed', message: 'duplicate', description: 'Not successful, such user already exists'});      
      }
      const hashPassword = await bcrypt.hash(password, 3);
      const user = await User.create({
        username: username,
        password: hashPassword
      })
      if (user) {
        return res.json({status:'ok', message: 'success', description: 'Success'});
      }
    } catch (e) {
      console.log(e);
      return res.json({status:'failed', message: 'error', description: 'Not successful, unknown error'});
    }
  }

  async login (username, password, res){

    try {
      const user = await User.findOne({where: {username}});
      if (!user) {
        return res.json({status:'failed', message: 'unauthorized', description: 'Not successful, invalid username or password'});      
      }
      const isPassEquals = await bcrypt.compare(password, user.password);
      if (!isPassEquals) {
        return res.json({status:'failed', message: 'unauthorized', description: 'Not successful, invalid username or password'});
      }
      const token = jwt.sign({id: user.id, username: user.username}, process.env.SECRET_KEY, {expiresIn: '24h'});
      return res.json({
        token: token,
        balance: user.balance,
        games: user.games,
        status: 'ok',
        message: 'success',
        description: 'Success'
      })
    } catch (e) {
      console.log(e);
      return res.json({status:'failed', message: 'error', description: 'Not successful, unknown error'});
    }
  }

}