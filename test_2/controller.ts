import { Request, Response } from 'express';
import CryptoService from './service/crypto-service'


export default new class CryptoController {

  async getBalance(req: Request, res: Response) {
    const EthereumBalance: string = await CryptoService.getEthereumBalance();
    const tokens: Array<any> = await CryptoService.getTokensPerAddress();
    const data: object = {
      balance: EthereumBalance,
      tokens: tokens
    }
    
    return res.json(data);
  }

}