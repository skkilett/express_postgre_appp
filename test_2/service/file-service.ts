import * as fs from 'fs';
import  CryptoService  from "./crypto-service";
export default new class FileService {
  async writeToFile(){
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const EthereumBalance: string = await CryptoService.getEthereumBalance();
    const tokens: Array<any> = await CryptoService.getTokensPerAddress();
    const data: object = {
      balance: EthereumBalance,
      tokens: tokens,
      time: time
    }
    fs.writeFileSync("data.json", JSON.stringify(data));
    setTimeout(async () => {await this.writeToFile()}, 60000)
  }

  
}

