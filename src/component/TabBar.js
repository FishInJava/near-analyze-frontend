import React from "react";
import {NavLink} from "react-router-dom";
/*导航栏*/
export default function TabBar() {
    return (
        <footer>
            <ul>
                <li>
                    <NavLink to="/hotTransaction">火爆合约</NavLink>
                </li>
                <li>
                    <NavLink to="/statistics">合约</NavLink>
                </li>
                <li>
                    <NavLink to="/wallet">钱包查询</NavLink>
                </li>
                <li>
                    <NavLink to="/ref-finance">REF份额分析</NavLink>
                </li>
            </ul>
        </footer>)
}
