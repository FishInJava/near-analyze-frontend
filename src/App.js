import React from "react";
import {HashRouter} from "react-router-dom";
import MainRouter from "./routes";
import TabBar from "./component/TabBar";

// @ts-ignore
window.Buffer = require('buffer').Buffer;
function App() {
    return (
        <HashRouter>
            <MainRouter/>
            <TabBar/>
        </HashRouter>);
}

export default App;
