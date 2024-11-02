// backend/transactionService.js
import { algodClient, algosdk } from "./algorandClient.js";

const sendTransaction = async (fromAccount, toAccount, amount) => {
  const suggestedParams = await algodClient.getTransactionParams().do();
  const ptxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    from: fromAccount.addr,
    to: toAccount.addr,
    amount,
    suggestedParams,
    note: new Uint8Array(Buffer.from("hello world")),
  });

  const signedTxn = ptxn.signTxn(fromAccount.privateKey);
  const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
  const result = await algosdk.waitForConfirmation(algodClient, txId, 4);

  console.log(`Transaction Information: ${result.txn}`);
  console.log(`Decoded Note: ${Buffer.from(result.txn.txn.note).toString()}`);
  return result;
};

export { sendTransaction };
