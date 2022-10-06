import Deposit from "../models/deposit-model.js";
import User from "../models/user-model.js";

export default new class RefillService {
  async refill(username, amount, res) {
    try {
      const user = await User.findOne({where: {username}});
      const newBalance = user.balance + +amount;
      await User.update({balance: newBalance}, {where: {username}});
      const updatedUser = await User.findOne({where: {username}});
      const deposit = await Deposit.create({
        username: username,
        amount: amount
      })
      if (deposit) {
        return res.json({
          balance: updatedUser.balance,
          deposit_id: deposit.deposit_id,
          status:'ok', 
          message: 'success', 
          description: 'Success'
        });
      }
    } catch (e) {
      console.log(e);
      return res.json({status:'failed', message: 'error', description: 'Not successful, unknown error'});
    }
  }
}