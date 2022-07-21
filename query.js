const{ LCDClient, MnemonicKey } = require('@terra-money/terra.js');

require('dotenv').config();

const main = async () => {
    const terra = new LCDClient({
        URL: process.env.TERRA_NODE_URL,
        chainID: process.env.TERRA_CHAIN_ID
    });
    const mk = new MnemonicKey({
        mnemonic: process.env.MNEMONIC
    });

    const blockInfo = await terra.tendermint.blockInfo();
    console.log("Block info", blockInfo);

    const nodeInfo = await terra.tendermint.nodeInfo();
    console.log("Block info", nodeInfo);

    const validatorSet = await terra.tendermint.validatorSet();
    console.log("Block info", validatorSet);

    const accountInfo = await terra.auth.accountInfo(mk.accAddress);
    console.log("Account info", accountInfo);
  
}

main().then((resp) => {
    console.log(resp);
}).catch((err) => {
    console.error(err);
})