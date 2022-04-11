import React, {Component} from "react";
import {Input, Table} from 'antd';
import axios from "axios";
import "antd/dist/antd.min.css";
const {Search} = Input;

class UserTransaction extends Component {
    state = {
        userTransactions: [],
        // 分页使用
        total: 0,
        pageSize: 10,
    };

    onSearch = async (param) => {
        let url = `http://localhost:8080/userTransactionController/getUserTransactions`
        await axios.post(url, param).then((res) => {
            this.setState({
                userTransactions: res.data.data.list,
                total: res.data.data.total
            })
        })
    }

    render() {
        const userTransactionColumns = [
            {
                title: 'actionKind',
                dataIndex: 'actionKind',
            },
            {
                title: '方法名称',
                dataIndex: 'methodName',
            },
            {
                title: '方法参数',
                dataIndex: 'argsDTO',
            },
            {
                title: '时间',
                dataIndex: 'blockTimestampStr',
            },
            {
                title: '交易hash',
                dataIndex: 'hash',
                key: "hash",
            },
        ];
        return (
            <div>
                <h1 align="center">用户交易分析页面</h1>
                <Search
                    placeholder="account-id"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={(userAccountId) => this.onSearch({
                        pageNum: 1,
                        pageSize: this.state.pageSize,
                        userAccountId: userAccountId
                    })}
                />
                <div>
                    <Table dataSource={this.state.userTransactions} columns={userTransactionColumns}
                           rowKey="hash"
                           pagination={{
                               pageSize: this.state.pageSize,
                               defaultCurrent: 1,
                               onChange: this.changePage,
                               total: this.state.total,
                           }}/>
                </div>
            </div>);
    }
}

export default UserTransaction;