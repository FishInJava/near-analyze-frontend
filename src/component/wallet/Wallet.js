import {Component} from "react";
import {Input} from 'antd';
import FungibleTokens from "../../services/FungibleTokens";
import {config} from "../../config";

const {Search} = Input;

class Wallet extends Component {

    onSearch = async (accountId) => {
        // const likelyTokenContracts = FungibleTokens.getLikelyTokenContracts({accountId: accountId});
        // likelyTokenContracts.then(res=>{
        //     alert(res)
        // })
        const likelyContracts = [...new Set([...(await FungibleTokens.getLikelyTokenContracts({accountId})), ...config.WHITELISTED_CONTRACTS])];
        // console.log(likelyContracts)
        // alert(likelyContracts)

        /*
           如何处理await方法呢？
        * */
        let result = [];
        await Promise.all(likelyContracts.map(async (contractName) => {
            try {
                const balance = await FungibleTokens.getBalanceOf({contractName, accountId});
                balance.then(res =>{
                    result.push({
                        "contractName":contractName,
                        "balance":res
                    });
                })
            } catch (e) {
                // Continue loading other likely contracts on failures
                console.warn(`Failed to load FT for ${contractName}`, e);
            }
        })).then(res=>{
            console.log(result)
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