import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/authorization/LoginPage";
import RegisterPage from "./pages/authorization/RegisterPage";
import HomePage from "./pages/home/HomePage";
import './App.css';
import ConfiguratorUserPage from "./pages/configuratorUser/ConfiguratorUserPage";
import UserSetupsPage from "./pages/setups/UserSetupsPage";
import SavedSetupsPage from "./pages/setups/SavedSetupsPage";
import YourSetupPage from "./pages/setups/YourSetupPage";
import ConfiguratorSoftwarePage from "./pages/configuratorSoftware/ConfiguratorSoftwarePage";

function App() {
    return (
        <div className={"flex flex-auto"}>
            <Routes>
                <Route path={'/login'} element={<LoginPage/>}/>
                <Route path={'/register'} element={<RegisterPage/>}/>
                <Route path={'/'} element={<HomePage/>}/>
                <Route path={'/confy'} element={<ConfiguratorUserPage/>}/>
                <Route path={'/confs'} element={<ConfiguratorSoftwarePage/>}/>
                <Route path={'/userSetups'} element={<UserSetupsPage/>}/>
                <Route path={'/savedSetups'} element={<SavedSetupsPage/>}/>
                <Route path={'/yourSetups'} element={<YourSetupPage/>}/>
            </Routes>
        </div>
    );
}

export default App;

