import {HashRouter} from "react-router-dom";
import MainRouter from "./routes";
import TabBar from "./component/TabBar";

function App() {
    return (
        <HashRouter>
            <MainRouter/>
            <TabBar/>
        </HashRouter>);
}

export default App;
