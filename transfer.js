const{ LCDClient, MnemonicKey, MsgSend, isTxError } = require('@terra-money/terra.js');

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
    const toAddress = "terra1zw6j7cc2x8xr5gx4h6ngj2aczw0nr7rj08upxl";

  
}

main().then((resp) => {
    console.log(resp);
}).catch((err) => {
    console.error(err);
})