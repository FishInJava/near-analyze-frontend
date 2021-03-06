import React, {Component} from "react";
import {Input, Table, Button} from 'antd';
import axios from "axios";
import "antd/dist/antd.min.css";
import {getTransactionInfoUrl} from "../../../utils/explorerUrl";
import '../../../css/styles.css';

const {Search} = Input;

class UserTransaction extends Component {
    state = {
        userTransactions: [],
        actions: [],
        userAccountId: "",
        // 分页使用
        total: 0,
        pageSize: 60,
        filterMethodName: ['confirm', 'delete_request'],
        filterAction: ['addKey', 'deleteKey']
    };

    onSearch = (param) => {
        this.setState({userAccountId: param.userAccountId})
        this.setState({userTransactions: null, actions: null})
        let url = `http://localhost:8080/userTransactionController/getUserTransactions`
        axios.post(url, param).then((res) => {
            this.setState({
                userTransactions: res.data.data.list,
                actions: res.data.data.actions,
                total: res.data.data.total
            })
        })
    }

    // 分页
    changePage = (page, pageSize) => {
        const param = {
            pageNum: page,
            pageSize: pageSize,
            filterMethodName: this.state.filterMethodName,
            filterAction: this.state.filterAction,
            userAccountId: this.state.userAccountId,
        }
        this.onSearch(param);
    }

    render() {


        const userTransactionColumns = [
            {
                title: '时间',
                dataIndex: 'blockTimestampStr',
                key: 'hash',
                className:'bigFont',
                align: 'center',
                render: (text, record) => (
                    <span>
                        {record.blockTimestampStr}
                        <Button onClick={() => {
                            window.open(getTransactionInfoUrl(record.hash))
                        }}>{record.hash}</Button>
                    </span>
                )
            },
            {
                title: 'Real-action',
                align: 'center',
                dataIndex: ['firstAction', 'type'],
            },
            {
                title: 'receiverId',
                align: 'center',
                className:'bigFont',
                dataIndex: ['firstAction', 'receiverId'],
            },
            {
                title: '方法名称',
                align: 'center',
                className:'bigFont',
                dataIndex: ['firstAction', 'method_name'],
            },
            {
                title: '方法参数',
                align: 'left',
                className:'bigFont',
                dataIndex: ['firstAction', 'args'],
            },

        ];
        const userTransactionAction = [
            {
                title: 'actionKind',
                dataIndex: 'actionKind',
                key: "actionKind",
            },
            {
                title: '数目',
                dataIndex: 'count',
            },
            {
                title: '操作',
                dataIndex: 'actionKind',
                render: (actionKind) => <Button type="primary" onClick={() => {
                    console.log(actionKind)
                }}>查看</Button>
            },
        ];
        return (
            <div>
                <h1 align="center">用户操作查询页面</h1>
                <Search
                    placeholder="account-id"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={(userAccountId) => this.onSearch({
                        pageNum: 1,
                        pageSize: this.state.pageSize,
                        userAccountId: userAccountId,
                        filterMethodName: this.state.filterMethodName,
                        filterAction: this.state.filterAction,
                    })}
                />
                <div>
                    <Table dataSource={this.state.actions} columns={userTransactionAction} rowKey="actionKind"/>
                </div>
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