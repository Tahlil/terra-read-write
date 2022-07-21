const { LCDClient, MnemonicKey, MsgSwap, Coin, isTxError } = require('@terra-money/terra.js');

require('dotenv').config();

const main = async () => {
    const terra = new LCDClient({
        URL: process.env.TERRA_NODE_URL,
        chainID: process.env.TERRA_CHAIN_ID
    });
    const mk = new MnemonicKey({
        mnemonic: process.env.MNEMONIC
    });

    const wallet = terra.wallet(mk);

    const msg = MsgSwap(wallet.key.accAddress, new Coin('uluna', '2000000'), "uusd");

    const tx = await wallet.createAndSignTx({
        msgs: [msg],
        memo: "Memo: sending 2 Luna"
    });

    const txHash = await terra.tx.hash(tx);
    console.log("Tx hash", txHash);

    const txReceipt = await terra.tx.broadcast(tx);

    if (isTxError(txReceipt)) {
        console.error(txReceipt);
        throw new Error("Could not send tx");
    }

    console.log("Result Logs:", txReceipt.logs);




}

main().then((resp) => {
    console.log(resp);
}).catch((err) => {
    console.error(err);
})