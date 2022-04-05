import {sendJson} from '../utils/tmp_fetch_send_json';

import {walletSimple} from "../utils/walletSimple";

export default class FungibleTokens {
    // View functions are not signed, so do not require a real account!
    static viewFunctionAccount = walletSimple.getAccountBasic('dontcare')

    static async getLikelyTokenContracts({ accountId }) {
        return sendJson('GET', `https://helper.mainnet.near.org/account/${accountId}/likelyTokens`);
    }

    static async getBalanceOf({ contractName, accountId }) {
        return this.viewFunctionAccount.viewFunction(contractName, 'ft_balance_of', { account_id: accountId });
    }

}