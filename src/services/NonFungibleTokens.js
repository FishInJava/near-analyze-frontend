import {config} from "../config";
import {sendJson} from '../utils/tmp_fetch_send_json';
import {walletSimple} from "../utils/walletSimple";

// Methods for interacting with NEP171 tokens (https://nomicon.io/Standards/NonFungibleToken/README.html)
export default class NonFungibleTokens {
    // View functions are not signed, so do not require a real account!
    static viewFunctionAccount = walletSimple.getAccountBasic('dontcare')

    static getLikelyTokenContracts = async (accountId) => {
        return sendJson('GET', `${config.ACCOUNT_HELPER_URL}/account/${accountId}/likelyNFTs`);
    }

    static getMetadata = async (contractName) => {
        return this.viewFunctionAccount.viewFunction(contractName, 'nft_metadata');
    }
}

export const nonFungibleTokensService = new NonFungibleTokens();
