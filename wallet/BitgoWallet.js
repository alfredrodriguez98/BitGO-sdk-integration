const BitGoJS = require("bitgo");
require("dotenv").config();

class BitGoWallet {
  constructor(coinType) {
    this.bitgo = new BitGoJS.BitGo({
      env: "test",
      accessToken: process.env.ACCESS_TOKEN,
    });
    this.bitgo.unlock({ otp: process.env.BITGO_OTP });
    this.coinType = coinType;
  }

  async getWallet(walletId) {
    try {
      const wallet = await this.bitgo
        .coin(this.coinType)
        .wallets()
        .get({ id: walletId });

      return wallet;
    } catch (err) {
      console.error("Error:", err);
    }
  }

  async createWallet() {
    try {
      const wallet = await this.bitgo.coin(this.coinType).newWalletObject();

      return wallet;
    } catch (err) {
      console.error("Error:", err);
    }
  }

  async getWalletBalance(walletId) {
    try {
      const wallet = await this.getWallet(walletId);
      return wallet.balance();
    } catch (err) {
      console.error("Error:", err);
    }
  }

  async sendBitcoin(walletId, recipientAddress, amount, walletPassphrase) {
    try {
      const wallet = await this.getWallet(walletId);
      var transactionId = 0;
      const { halfSigned } = await wallet.send({
        amount: amount,
        address: recipientAddress,
        walletPassphrase: walletPassphrase,
      });
      transactionId++;

      return halfSigned, transactionId;
    } catch (err) {
      console.error("Error:", err);
    }
  }
}

module.exports = BitGoWallet;
