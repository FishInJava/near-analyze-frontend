import React from "react";
import {NavLink} from "react-router-dom";
/*导航栏*/
export default function TabBar() {
    return (
        <footer>
            <ul>
                <li>
                    <NavLink to="/hotTransaction">火爆合约Redis</NavLink>
                </li>
                <li>
                    <NavLink to="/hotTransactionsHistory">火爆合约Redis(历史)</NavLink>
                </li>
                <li>
                    <NavLink to="/statistics">合约统计（transaction_analyze）</NavLink>
                </li>
                <li>
                    <NavLink to="/statisticsFilter">合约统计过滤（transaction_analyze_filter）</NavLink>
                </li>
                <li>
                    <NavLink to="/wallet">钱包查询</NavLink>
                </li>
                <li>
                    <NavLink to="/refFinance">REF份额分析</NavLink>
                </li>
                <li>
                    <NavLink to="/transaction/user">用户操作查询</NavLink>
                </li>
                <li>
                    <NavLink to="/transaction/user/linkedUser">关联账户（Transfer统计）</NavLink>
                </li>
            </ul>
        </footer>)
}
