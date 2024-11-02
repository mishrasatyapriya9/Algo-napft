// backend/accountService.js
import { algodClient, algosdk } from "./algorandClient.js";

const createAccount = () => {
  const generatedAccount = algosdk.generateAccount();
  const passphrase = algosdk.secretKeyToMnemonic(generatedAccount.sk);

  console.log(`My address: ${generatedAccount.addr}`);
  console.log(`My passphrase: ${passphrase}`);

  return { address: generatedAccount.addr, passphrase };
};

const fundAccount = async (address) => {
  // Use the Algorand testnet faucet to fund the account
  const faucetURL = "https://testnet.algoexplorerapi.io/v2/transactions/fund";
  await fetch(faucetURL, {
    method: "POST",
    body: JSON.stringify({ address }),
    headers: { "Content-Type": "application/json" },
  });
};
const getBalance = async (address) => {
  const accountInfo = await algodClient.accountInformation(address).do();
  console.log(`Account balance: ${accountInfo.amount} microAlgos`);
  return accountInfo.amount;
};

export { createAccount, fundAccount, getBalance };