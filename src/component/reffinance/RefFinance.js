import React, {Component} from "react";
import {Input, Table} from "antd";
import axios from "axios";

const {Search} = Input;

class RefFinance extends Component {
    state = {
        accountId: "",
        userPools: [],
        userSeeds: [],
    };

    onSearch = async (accountId) => {
        let url = `http://localhost:8080/refFinanceController/getListUserSeeds/${accountId}`
        await axios.get(url).then((res) => {
            this.setState({accountId: res.data.data.accountId})
            this.setState({userPools: res.data.data.pools})
            this.setState({userSeeds: res.data.data.userSeeds})
        })
        console.log(this.state)
    }

    render() {
        const userPools_columns = [
            {
                title: '池子交易对',
                dataIndex: 'tokenPairs',
                key: "tokenPairs",
            },
            {
                title: '用户份额（单位$）',
                dataIndex: 'userValue',
                key: "userValue",
            }
        ];
        return (
            <div>
                <h1 align="center">REF份额分析</h1>
                <Search
                    placeholder="account-id"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={(value) => this.onSearch(value)}
                />
                <div>
                    <Table dataSource={this.state.userPools} columns={userPools_columns} rowKey="tokenPairs"/>
                </div>
            </div>);
    }
}

export default RefFinance;