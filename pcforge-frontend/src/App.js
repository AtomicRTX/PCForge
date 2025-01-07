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
import Admin from "./routes/Admin";
import Logged from "./routes/Logged";
import AdminSetupsPage from "./pages/setups/AdminSetupsPage";
import AdminUsersPage from "./pages/users/AdminUsersPage";
import ProfilePage from "./pages/users/ProfilePage";
import EditProfilePage from "./pages/users/EditProfilePage";

function App() {
    return (
        <div className={"flex flex-auto w-full"}>
            <Routes>
                <Route>
                    <Route path={'/'} element={<HomePage/>}/>
                    <Route path={'/confy'} element={<ConfiguratorUserPage/>}/>
                    <Route path={'/confs'} element={<ConfiguratorSoftwarePage/>}/>
                    <Route path={'/userSetups'} element={<UserSetupsPage/>}/>
                    <Route path={'/login'} element={<LoginPage/>}/>
                    <Route path={'/register'} element={<RegisterPage/>}/>
                    <Route path={'/profile'} element={<ProfilePage/>}/>
                    <Route path={'/edit'} element={<EditProfilePage/>}/>
                </Route>
                <Route element={<Logged/>}>
                    <Route path={'/savedSetups'} element={<SavedSetupsPage/>}/>
                    <Route path={'/yourSetups'} element={<YourSetupPage/>}/>
                </Route>
                <Route element={<Admin/>}>
                    <Route path={'/users'} element={<AdminUsersPage/>}/>
                    <Route path={'/setups'} element={<AdminSetupsPage/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;

