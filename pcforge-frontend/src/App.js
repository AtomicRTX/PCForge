import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import './App.css';
import 'flowbite';

function App() {
  return (
      <div className={"flex flex-auto"}>
        <Routes>
          <Route path={'/login'} element={<LoginPage/>}/>
          <Route path={'/register'} element={<RegisterPage/>}/>
          <Route path={'/'} element={<HomePage/>}/>
        </Routes>
      </div>
  );
}

export default App;

