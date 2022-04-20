import React, {Component} from "react";
import {Input, Table, Button} from 'antd';
import axios from "axios";
import "antd/dist/antd.min.css";

const {Search} = Input;

class LinkedUserAccount extends Component {
    state = {
        in: [],
        out: [],
    };

    compare = (p) =>{
        return function(m,n){
            const a = m[p];
            const b = n[p];
            return b-a; // 降序
        }
    }

    onSearch = (param) => {
        this.setState({in: null, out: null})
        let url = `http://localhost:8080/userTransactionController/getTransferTransactions`
        axios.post(url, param).then((res) => {
            const inMap = res.data.data.in;
            const outMap = res.data.data.out;
            const inArr = [];
            const outArr = [];
            for(const key in inMap){
                inArr.push({"accountId":key,"value":inMap[key]})
            }
            for(const key in outMap){
                outArr.push({"accountId":key,"value":outMap[key]})
            }
            this.setState({
                in: inArr.sort(this.compare("value")),
                out: outArr.sort(this.compare("value")),
            })
        })
    }

    render() {
        const transfer_out = [
            {
                title: '转出账户',
                dataIndex: 'accountId',
                key: "accountId",
            },
            {
                title: '转出数目',
                dataIndex: 'value',
            }
        ];
        const transfer_in = [
            {
                title: '转入账户',
                dataIndex: 'accountId',
                key: "accountId",
            },
            {
                title: '转入数目',
                dataIndex: 'value',
            }
        ];
        return (
            <div>
                <h1 align="center">关联账户页面（Transfer统计）</h1>
                <Search
                    placeholder="account-id"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={(userAccountId) => this.onSearch({
                        userAccountId: userAccountId,
                    })}
                />
                <div>
                    <Table dataSource={this.state.in} columns={transfer_in} rowKey="actionKind"/>
                </div>
                <div>
                    <Table dataSource={this.state.out} columns={transfer_out} rowKey="hash"/>
                </div>
            </div>);
    }
}

export default LinkedUserAccount;