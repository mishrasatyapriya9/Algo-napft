// backend/algorandClient.js
import algosdk from "algosdk";

// Connect to Algorand
const algodToken = "a".repeat(64);
const algodServer = "http://localhost";
const algodPort = 4001;

const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

export { algodClient, algosdk };
