import {Component} from "react";
import {Table, Button} from "antd";
import axios from "axios";

// 从transaction_analyze表中获取数据分析
class Statistics extends Component {
    state = {
        // 火热accountId
        getStatisticsTransactions: [],
        // 分页使用
        total: 0,
        pageSize: 10,
        flag: 2,
        milliTime: 30 * 60 * 1000,
    };

    getStatisticsTransactions = (param) => {
        axios.post("http://localhost:8080/nearAnalyzeController/getStatisticsTransactions", param).then((res) => {
            console.log(res.data.data.list)
            this.setState({getStatisticsTransactions: res.data.data.list, total: res.data.data.total})
        })
    };

    // 分页
    changePage = (page, pageSize) => {
        const param = {
            pageNum: page,
            pageSize: pageSize,
            flag: this.state.flag,
            milliTime: this.state.milliTime,
        }
        this.getStatisticsTransactions(param);
    }

    componentDidMount() {
        const param = {
            pageNum: 1,
            pageSize: 10,
            flag: this.state.flag,
            milliTime: this.state.milliTime,
        }
        this.getStatisticsTransactions(param);
    }

    // 渲染一个div
    render() {
        const getStatisticsTransactions_columns = [
            {
                title: '合约地址',
                dataIndex: 'value',
                key: "value",
            },
            {
                title: '访问次数',
                dataIndex: 'count',
                key: "count",
            }
        ];
        return (
            <div>
                <h1 align="center">Statistics页面</h1>
                <div>
                    <Button onClick={() => this.setState({flag: 1})}>signer_id发起者维度</Button>
                    <Button onClick={() => this.setState({flag: 2})}>receiver_id合约维度</Button>
                </div>
                <div>
                    <Button onClick={() => this.setState({milliTime: 30 * 60 * 1000})}>半小时内</Button>
                    <Button onClick={() => this.setState({milliTime: 60 * 60 * 1000})}>1小时内</Button>
                    <Button onClick={() => this.setState({milliTime: 2 * 60 * 60 * 1000})}>2小时内</Button>
                    <Button onClick={() => this.setState({milliTime: 4 * 60 * 60 * 1000})}>4小时内</Button>
                    <Button onClick={() => this.setState({milliTime: 12 * 60 * 60 * 1000})}>12小时内</Button>
                    <Button onClick={() => this.setState({milliTime: 24 * 60 * 60 * 1000})}>1天内</Button>
                </div>
                <div>
                    <Button type="primary" onClick={() => this.getStatisticsTransactions({
                        pageNum: 1,
                        pageSize: this.state.pageSize,
                        flag: this.state.flag,
                        milliTime: this.state.milliTime,
                    })}>查询</Button>
                </div>
                <Table dataSource={this.state.getStatisticsTransactions} columns={getStatisticsTransactions_columns}
                       rowKey="value"
                       pagination={{
                           pageSize: this.state.pageSize,
                           defaultCurrent: 1,
                           onChange: this.changePage,
                           total: this.state.total,
                       }}/>
            </div>);
    }
}

export default Statistics;