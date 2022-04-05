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
        const likelyContracts = [...new Set([...(await FungibleTokens.getLikelyTokenContracts({accountId: accountId})), ...config.WHITELISTED_CONTRACTS])];
        console.log(likelyContracts)
        alert(likelyContracts)
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