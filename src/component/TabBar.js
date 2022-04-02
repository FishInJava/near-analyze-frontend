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
            </ul>
        </footer>)
}
