import {sendJson} from '../utils/tmp_fetch_send_json';

export default class FungibleTokens {

    static async getLikelyTokenContracts({ accountId }) {
        return sendJson('GET', `https://helper.mainnet.near.org/account/${accountId}/likelyTokens`);
    }

}