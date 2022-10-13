import Web3 from 'web3';
import axios from 'axios';
import  erc20AbiJson from "../erc20Abi.json";
import { AbiItem } from 'web3-utils'
import { TokenAmountOnAddress } from "../interfaces/token-amount-interface";

export default new class CryptoService {


  async getTokenAddresses(){
    const data = await axios.get(
      process.env.TOKEN_ADDRESSES_LINK,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    return data.data;
    
  }

  async getTokensPerAddress(){
    const web3: Web3 = new Web3(new Web3.providers.HttpProvider(process.env.PROVIDER_LINK));
    const tokenAddressesArray: Array<any> = await this.getTokenAddresses();
    const tokenAmountArray: Array<TokenAmountOnAddress> = [];
    try {
          for (let i = 0; i < tokenAddressesArray.length; i++) {
      const contract = new web3.eth.Contract(erc20AbiJson as AbiItem[], tokenAddressesArray[i].address);
      
      const tokenBalance = await contract.methods.balanceOf(process.env.ADDRESS).call();
      
      if (+tokenBalance > 0) {
        tokenAmountArray.push({
          symbol: tokenAddressesArray[i].symbol,
          amount: tokenBalance
        })
      }
      
    }
    } catch (e) {
      console.log(e);
      
    }
    return tokenAmountArray;
  }


  async getEthereumBalance(): Promise<string> {
    const web3: Web3 = new Web3(new Web3.providers.HttpProvider(process.env.PROVIDER_LINK));
    const address: string = process.env.ADDRESS;
    const getBalance: string = await web3.eth.getBalance(address);
    const ethBalance: string = web3.utils.fromWei(getBalance, 'ether');
    return ethBalance;
  }
}

