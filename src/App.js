import HotTransactions from "./component/transaction/HotTransactions";

import {HashRouter, Route, Routes} from "react-router-dom";
import MainRouter from "./router";
import TabBar from "./component/TabBar";

function App() {
    return (
        <HashRouter>
            <MainRouter/>
            <TabBar/>
        </HashRouter>);
}

export default App;
