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

    onSearch = (param) => {
        this.setState({in: null, out: null})
        let url = `http://localhost:8080/userTransactionController/getTransferTransactions`
        axios.post(url, param).then((res) => {
            this.setState({
                in: res.data.data.in,
                out: res.data.data.out,
            })
        })
    }

    render() {
        const transfer_out = [
            {
                title: '转出账户',
                dataIndex: 'value',
                key: "value",
            },
            {
                title: '转出数目',
                dataIndex: 'score',
            }
        ];
        const transfer_in = [
            {
                title: '转入账户',
                dataIndex: 'value',
                key: "value",
            },
            {
                title: '转入数目',
                dataIndex: 'score',
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