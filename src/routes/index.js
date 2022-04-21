import React from "react";
import {Route, Routes} from "react-router-dom";
import HotTransactions from "../component/transaction/HotTransactions";
import Statistics from "../component/statistics/Statistics";
import Wallet from "../component/wallet/Wallet";
import RefFinance from "../component/reffinance/RefFinance";
import UserTransaction from "../component/transaction/user/UserTransaction";
import LinkedUserAccount from "../component/transaction/user/LinkedUserAccount";
import StatisticsFilter from "../component/statistics/StatisticsFilter";
import HotTransactionsHistory from "../component/transaction/HotTransactionsHistory";

/*路由*/
export default function MainRouter() {
    return (
        <Routes>
            <Route path="/hotTransaction" element={<HotTransactions/>}/>
            <Route path="/hotTransactionsHistory" element={<HotTransactionsHistory/>}/>
            <Route path="/statistics" element={<Statistics/>}/>
            <Route path="/statisticsFilter" element={<StatisticsFilter/>}/>
            <Route path="/wallet" element={<Wallet/>}/>
            <Route path="/refFinance" element={<RefFinance/>}/>
            <Route path="/transaction/user" element={<UserTransaction/>}/>
            <Route path="/transaction/user/linkedUser" element={<LinkedUserAccount/>}/>
            {/*如果前面都没匹配上，进行重定向，使用的是Navigate组件*/}
            {/*<Route path="*" element={<Navigate to="/hotTransaction"/>}/>*/}
        </Routes>)
}