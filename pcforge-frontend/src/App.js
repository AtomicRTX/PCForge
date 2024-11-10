import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import './App.css';
import ConfiguratorYPage from "./pages/ConfiguratorYPage";
import UserSetupsPage from "./pages/UserSetupsPage";
import SavedSetupsPage from "./pages/SavedSetupsPage";
import YourSetupPage from "./pages/YourSetupPage";

function App() {
    return (
        <div className={"flex flex-auto"}>
            <Routes>
                <Route path={'/login'} element={<LoginPage/>}/>
                <Route path={'/register'} element={<RegisterPage/>}/>
                <Route path={'/'} element={<HomePage/>}/>
                <Route path={'/confy'} element={<ConfiguratorYPage/>}/>
                <Route path={'/userSetups'} element={<UserSetupsPage/>}/>
                <Route path={'/savedSetups'} element={<SavedSetupsPage/>}/>
                <Route path={'/yourSetups'} element={<YourSetupPage/>}/>
            </Routes>
        </div>
    );
}

export default App;

