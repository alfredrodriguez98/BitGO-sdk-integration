const BitGoJS = require("bitgo");
const bitgo = new BitGoJS.BitGo({ env: "test" });
const Promise = require("bluebird");
require("dotenv").config();

const coin = "tbtc";
const basecoin = bitgo.coin(coin);

const accessToken = process.env.ACCESS_TOKEN;
const walletId = process.env.WALLET_ID;

Promise.coroutine(function* () {
  bitgo.authenticateWithAccessToken({ accessToken: accessToken });

  const walletInstance = yield basecoin.wallets().get({ id: walletId });
  const wallet = yield bitgo.coin(coin).wallets().get({ id: walletId });
  const newReceiveAddress = yield wallet.createAddress();

  console.log("Wallet ID:", walletInstance.id());
  console.log("Wallet Label:", walletInstance.label());
  console.log("Current Receive Address:", walletInstance.receiveAddress());
  console.log("Second Receive Address:", newReceiveAddress.address);
  console.log("Balance:", walletInstance.balanceString());

})();
