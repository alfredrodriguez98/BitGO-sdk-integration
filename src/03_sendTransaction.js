const BitGoWallet = require("../wallet/BitgoWallet");
require("dotenv").config();

const bitgoWallet = new BitGoWallet("tbtc");

async function main() {
  const Transaction = await bitgoWallet.sendBitcoin(
    process.env.WALLET_ID,
    "2N55Tpopyt2vrDCLvcTQHqpAhwwKwybWRjY",
    "100000",
    process.env.WALLET_PASSPHRASE
  );
  console.log(Transaction);
}

main();
