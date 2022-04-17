import * as nearApiJs from "near-api-js";

import {config} from "../config";

// const { connect, WalletConnection,keyStores  } = nearApiJs;
// const keyStore = new keyStores.BrowserLocalStorageKeyStore();
// const config = {
//     networkId: "mainnet",
//     keyStore: keyStore,
//     nodeUrl: "https://rpc.mainnet.near.org",
//     walletUrl: "https://wallet.mainnet.near.org",
//     helperUrl: "https://helper.mainnet.near.org",
//     explorerUrl: "https://explorer.mainnet.near.org",
// };

class WalletSimple {
    constructor() {
        this.connection = nearApiJs.Connection.fromConfig({
            networkId: config.NETWORK_ID,
            provider: { type: 'JsonRpcProvider', args: { url: config.NODE_URL + '/' } },
            signer: {}
        });
    }
    // async getAccountBasic(accountId) {
    //     const near = await connect(config);
    //     const connection = new WalletConnection(near,'my-app');
    //     return new nearApiJs.Account(connection, accountId);
    // }
    getAccountBasic(accountId) {
        return new nearApiJs.Account(this.connection, accountId);
    }

    async viewAccount(accountId) {
        return this.connection.provider.query({
            request_type: 'view_account',
            account_id: accountId,
            finality: 'optimistic'
        });
    }
}

export const walletSimple = new WalletSimple();