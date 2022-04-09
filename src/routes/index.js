import React from "react";
import {Route, Routes} from "react-router-dom";
import HotTransactions from "../component/transaction/HotTransactions";
import Statistics from "../component/statistics/Statistics";
import Wallet from "../component/wallet/Wallet";
import RefFinance from "../component/reffinance/RefFinance";

/*路由*/
export default function MainRouter() {
    return (
        <Routes>
            <Route path="/hotTransaction" element={<HotTransactions/>}/>
            <Route path="/statistics" element={<Statistics/>}/>
            <Route path="/wallet" element={<Wallet/>}/>
            <Route path="/ref-finance" element={<RefFinance/>}/>
            {/*如果前面都没匹配上，进行重定向，使用的是Navigate组件*/}
            {/*<Route path="*" element={<Navigate to="/hotTransaction"/>}/>*/}
        </Routes>)
}