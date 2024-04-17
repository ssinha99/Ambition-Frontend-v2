import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./components/Index";
import Login from "./components/login/Login";
import AmbitionsHome from "./components/goals/AmbitionsHome";
import Funds from "./components/funds/FundsHome";
import AddAmbition from "./components/goals/AddAmbition";
import SignUp from "./components/login/SignUp";
import ProfileHome from "./components/profile/ProfileHome";

const App = () => (
  <>
    <Router>
      <Routes>
        <Route path="/" element={<AmbitionsHome />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path="/funds" element={<Funds/>}></Route>
        <Route path="/add" element={<AddAmbition/>}></Route>
        <Route path="/profile" element={<ProfileHome/>}></Route>
        <Route path="*" element={<Index/>}></Route>
      </Routes>
    </Router>
  </>
);

export default App;
