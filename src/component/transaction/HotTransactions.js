import {Component} from "react";
import "antd/dist/antd.css";
import{Table,Button} from "antd";
import axios from "axios";
import HotMethod from "./HotMethod";

// 有点意思，直接把一整坨html定义成一个对象
class HotTransactions extends Component{
    state = {
        // 火热accountId
        getHotAccountId:[],
        // 火热合约方法
        getHotMethodByAccountId:[],
        // 控制hotMethod展示
        showHotMethod:false,
        // 分页使用
        total:0
    };

    getHotAccountId = (param)=>{
        axios.post("http://localhost:8080/nearAnalyzeController/getHotAccountId",param).then((res) =>{
            console.log(res.data.data.list)
            this.setState({getHotAccountId:res.data.data.list,total:res.data.data.total})
        })
    };

    getHotMethodByAccountId = (accountId) => {
        let url = `http://localhost:8080/nearAnalyzeController/getHotMethodByAccountId/${accountId}/0/40`
        axios.get(url).then((res) =>{
            this.setState({getHotMethodByAccountId:res.data.data})
            this.setState({showHotMethod:true})
        })
    };

    closeHotMethod = ()=>{
        this.setState({showHotMethod:false})
    }

    // 分页
    changePage = (page,pageSize)=>{
        const param = {
            pageNum:page,
            pageSize:pageSize
        }
        this.getHotAccountId(param);
    }

    componentDidMount() {
        const param = {
            pageNum:1,
            pageSize:10
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
            },
            {
                title: '操作',
                dataIndex: 'value',
                key: "value",
                render: (record) =><Button type="primary" onClick={() => this.getHotMethodByAccountId(record)}>方法查看</Button>
            },
        ];
        return (<div>
            <Table dataSource={this.state.getHotAccountId} columns={getHotAccountId_columns} rowKey="value" pagination={{
                pageSize:10,
                defaultCurrent:1,
                onChange:this.changePage,
                total:this.state.total,
            }}/>
            <HotMethod visible={this.state.showHotMethod} close={this.closeHotMethod} getHotMethodByAccountId={this.state.getHotMethodByAccountId}/>
        </div>);
    }
}
export default HotTransactions;