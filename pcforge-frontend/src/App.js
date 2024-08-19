import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import './App.css';

function App() {
  return (
    <Router>
      <div className={"flex flex-auto"}>
        <Routes>
          <Route path={'/'} element={<LoginPage/>}/>
          <Route path={'/register'} element={<RegisterPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

