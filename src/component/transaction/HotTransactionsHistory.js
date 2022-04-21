import React, {Component} from "react";
import {Table} from "antd";
import axios from "axios";
import "antd/dist/antd.min.css";

class HotTransactionsHistory extends Component {
    state = {
        // 火热accountId
        getHotAccountId: [],
    };

    getHotAccountId = (param) => {
        axios.post("http://localhost:8080/nearAnalyzeController/getHotAccountIdByTime", param).then((res) => {
            this.setState({getHotAccountId: res.data.data.list})
        })
    };

    componentDidMount() {
        const yesterday = new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000;
        const param = {
            milliTime: yesterday
        }
        this.getHotAccountId(param);
    }

    // 渲染一个div
    render() {
        const getHotAccountId_columns = [
            {
                title: '合约地址',
                dataIndex: 'value',
                key: "value",
            },
            {
                title: '访问次数',
                dataIndex: 'score',
                key: "score",
            }
        ];
        return (
            <div>
                <Table dataSource={this.state.getHotAccountId} columns={getHotAccountId_columns} rowKey="value"/>
            </div>);
    }
}

export default HotTransactionsHistory;