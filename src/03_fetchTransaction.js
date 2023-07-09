const BitGoJS = require('bitgo');
require('dotenv').config();

const bitgo = new BitGoJS.BitGo({ env: 'test', accessToken: process.env.ACCESS_TOKEN });

// Fetch Wallet
async function fetchWallet() {
  const walletId = process.env.WALLET_ID;
  const wallet = await bitgo.coin('tbtc').wallets().get({ id: walletId });
  return wallet;
}

// Fetch Wallet Balance
async function fetchWalletBalance() {
  const wallet = await fetchWallet();
  const balance = wallet.balanceString();
  console.log('Wallet Balance:', balance);
  return balance;
}

// Send Bitcoin
async function sendBitcoin({ amount, address }) {
  const wallet = await fetchWallet();
  const walletPassphrase = process.env.WALLET_PASSPHRASE;
  const { halfSigned } = await wallet.send({ amount, address, walletPassphrase });
  const { tx } = await wallet.signTransaction({ transactionPrebuild: halfSigned, walletPassphrase });
  const response = await wallet.submitTransaction({ tx });
  console.log('Transaction Response:', response);
  return response;
}

// Fetch Transaction Details
async function fetchTransactionDetails() {
  const wallet = await fetchWallet();
  const transactions = await wallet.transactions();
  const latestTransaction = transactions.transactions[0];

  console.log('Wallet ID:', wallet.id());
  console.log('Transaction ID:', latestTransaction.id);
  console.log('Blockchain Fee:', latestTransaction.feeString);

  return latestTransaction;
}

//Sequence of actions
fetchWalletBalance();
sendBitcoin({ amount: '0.001', address: '2N1Dk6C74PM5xoUzEdoPLpWEWufULRwSagk' });
fetchTransactionDetails();


