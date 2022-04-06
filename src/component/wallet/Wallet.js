import React,{Component} from "react";
import {Input} from 'antd';
import FungibleTokens from "../../services/FungibleTokens";
import {config} from "../../config";
import {formatNearAmount} from "../../utils/balanceHelpers";
import { formatTokenAmount } from '../../utils/amounts';
import NonFungibleTokens from "../../services/NonFungibleTokens";

const {Search} = Input;
const FRAC_DIGITS = 5;

class Wallet extends Component {

    onSearch = async (accountId) => {
        const likelyContracts = [...new Set([...(await FungibleTokens.getLikelyTokenContracts({accountId})), ...config.WHITELISTED_CONTRACTS])];
        const likelyNFTContracts = await NonFungibleTokens.getLikelyTokenContracts(accountId);

        /*
           这样处理是不是很蠢？
        * */
        let result = [];
        await Promise.all(likelyContracts.map(async (contractName) => {
            try {
                const balance = await FungibleTokens.getBalanceOf({contractName, accountId});
                // 这可以缓存
                const metadata = await FungibleTokens.getMetadata({contractName});
                console.log(metadata)
                let balanceResult;
                if (metadata.symbol === 'NEAR'){
                    balanceResult = balance && formatNearAmount(balance)
                }else {
                    balanceResult = formatTokenAmount(balance, metadata.decimals, FRAC_DIGITS);
                }

                // 币种的元数据信息
                result.push({
                    "contract":contractName,
                    "symbol":metadata.symbol,
                    "decimals":metadata.decimals,
                    "balanceOrigin":balance,
                    "balance":balanceResult
                });
            } catch (e) {
                // Continue loading other likely contracts on failures
                console.warn(`Failed to load FT for ${contractName}`, e);
            }
        })).then(()=>{
            alert(JSON.stringify(result))
        })


        let NFTResult = [];
        await Promise.all(likelyNFTContracts.map(async (contractName) => {
            try {
                const metadata = await NonFungibleTokens.getMetadata(contractName);
                // 币种的元数据信息
                NFTResult.push({
                    "metadata":metadata,
                });
            } catch (e) {
                // Continue loading other likely contracts on failures
                console.warn(`Failed to load NFT for ${contractName}`, e);
            }
        })).then(()=>{
            alert(JSON.stringify(NFTResult))
        })

    }

    render() {
        return (
            <div>
                <h1 align="center">Wallet页面</h1>
                <Search
                    placeholder="account-id"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={(value) => this.onSearch(value)}
                />
            </div>);
    }
}

export default Wallet;