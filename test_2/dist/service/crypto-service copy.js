"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_1 = __importDefault(require("web3"));
const axios_1 = __importDefault(require("axios"));
const erc20Abi_json_1 = __importDefault(require("../erc20Abi.json"));
exports.default = new class CryptoService {
    getTokenAddresses() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield axios_1.default.get(process.env.TOKEN_ADDRESSES_LINK, {
                headers: {
                    Accept: 'application/json',
                },
            });
            return data.data;
        });
    }
    getTokensPerAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(process.env.PROVIDER_LINK));
            const tokenAddressesArray = yield this.getTokenAddresses();
            const tokenAmountArray = [];
            try {
                for (let i = 0; i < tokenAddressesArray.length; i++) {
                    const contract = new web3.eth.Contract(erc20Abi_json_1.default, tokenAddressesArray[i].address);
                    const tokenBalance = yield contract.methods.balanceOf(process.env.ADDRESS).call();
                    if (+tokenBalance > 0) {
                        tokenAmountArray.push({
                            symbol: tokenAddressesArray[i].symbol,
                            amount: tokenBalance
                        });
                    }
                }
            }
            catch (e) {
                console.log(e);
            }
            return tokenAmountArray;
        });
    }
    getEthereumBalance() {
        return __awaiter(this, void 0, void 0, function* () {
            const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(process.env.PROVIDER_LINK));
            const address = process.env.ADDRESS;
            const getBalance = yield web3.eth.getBalance(address);
            const ethBalance = web3.utils.fromWei(getBalance, 'ether');
            return ethBalance;
        });
    }
};
