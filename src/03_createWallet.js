const BitGoJS = require("bitgo");
const Promise = require("bluebird");
require("dotenv").config();
const bitgo = new BitGoJS.BitGo({
  env: "test",
  accessToken: process.env.MY_ACCESS_TOKEN,
});

const accessToken = process.env.MY_ACCESS_TOKEN;

const label =
  "BitGo Solutions Engineering Challange Challenge - Alfred Rodriguez";

const passphrase = process.env.WALLET_PASSPHRASE;

const coin = "tbtc";

Promise.coroutine(function* () {
  bitgo.authenticateWithAccessToken({ accessToken: accessToken });

  const walletOptions = {
    label,
    passphrase,
  };

  const wallet = yield bitgo.coin(coin).wallets().generateWallet(walletOptions);

  const walletInstance = wallet.wallet;

  console.log(`Wallet ID: ${walletInstance.id()}`);
  console.log(`Wallet label: ${walletInstance.label()}`);

})();
