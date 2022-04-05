import {Component} from "react";
import {Input} from 'antd';
import FungibleTokens from "../../services/FungibleTokens";
const {Search} = Input;

class Wallet extends Component {

    onSearch = (accountId) => {
        const likelyTokenContracts = FungibleTokens.getLikelyTokenContracts({accountId: accountId});
        likelyTokenContracts.then(res=>{
            alert(res)
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