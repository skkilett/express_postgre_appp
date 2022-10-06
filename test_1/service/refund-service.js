import Deposit from "../models/deposit-model.js";
import User from "../models/user-model.js";

export default new class RefundService {
  async refund(depositId, res) {
    try {
      const deposit = await Deposit.findOne({where: {deposit_id: depositId}});
      if (!deposit) {
        return res.json({status:'failed', message: 'unknown', description: 'Not successful, invalid deposit'});
      }
      const user = await User.findOne({where: {username: deposit.username}});
      const newBalance = user.balance - deposit.amount;
      await User.update({balance: newBalance}, {where: {username: deposit.username}});
      const updatedUser = await User.findOne({where: {username: deposit.username}});
      const deleteDeposit = await Deposit.destroy({where: {deposit_id: depositId}});
      if (deleteDeposit) {
        return res.json({
          status:'ok', 
          message: 'success', 
          balance: updatedUser.balance,
          description: 'Success'
        });
      }
    } catch (e) {
      console.log(e);
      return res.json({status:'failed', message: 'error', description: 'Not successful, unknown error'});
    }
  }
}