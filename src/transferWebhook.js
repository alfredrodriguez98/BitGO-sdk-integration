const BitGoJS = require("bitgo");
require("dotenv").config();

const bitgo = new BitGoJS.BitGo({
  env: "test",
  accessToken: process.env.ACCESS_TOKEN,
});

async function fetchWallet() {
  const walletId = process.env.WALLET_ID;
  const wallet = await bitgo.coin("tbtc").wallets().get({ id: walletId });
  return wallet;
}

async function addWebhook() {
  const wallet = await fetchWallet();
  const webhookUrl = "https://demo-url";
  const response = await wallet.addWebhook({
    url: webhookUrl,
    type: "transfer",
  });

  console.log("Webhook Response:", response);
  return response;
}

addWebhook();
