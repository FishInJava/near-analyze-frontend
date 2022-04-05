import * as nearApiJs from "near-api-js";

const { connect, WalletConnection,keyStores  } = nearApiJs;
const keyStore = new keyStores.BrowserLocalStorageKeyStore();
const config = {
    networkId: "mainnet",
    keyStore: keyStore,
    nodeUrl: "https://rpc.mainnet.near.org",
    walletUrl: "https://wallet.mainnet.near.org",
    helperUrl: "https://helper.mainnet.near.org",
    explorerUrl: "https://explorer.mainnet.near.org",
};

class WalletSimple {
    async getAccountBasic(accountId) {
        const near = await connect(config);
        const connection = new WalletConnection(near,'my-app');
        return new nearApiJs.Account(connection, accountId);
    }
}

export const walletSimple = new WalletSimple();