import {Component} from "react";
import {Modal, Table} from "antd";

class HotMethod extends Component{
    render() {
        const getHotMethodByAccountId_columns = [
            {
                title: '方法名称',
                dataIndex: 'value',
                key: "value",
            },
            {
                title: '访问次数',
                dataIndex: 'score',
                key: "score",
            },
        ];
        // close()是在使用时传递过来的方法
        return(<Modal visible={this.props.visible} title="合约方法排行" onCancel={()=>this.props.close()}>
            <Table dataSource={this.props.getHotMethodByAccountId} columns={getHotMethodByAccountId_columns} rowKey="value"/>
        </Modal>);
    }
}
export default HotMethod;