import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./components/Index";
import Login from "./components/login/Login";
import AmbitionsHome from "./components/goals/AmbitionsHome";
import Funds from "./components/funds/FundsHome";
import AddAmbition from "./components/goals/AddAmbition";
import SignUp from "./components/login/SignUp";
import ProfileHome from "./components/profile/ProfileHome";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";


const App = () => {
  const theme = useTheme();
const smallerDevice = useMediaQuery(theme?.breakpoints?.down("md"));
  return <>
    {smallerDevice ? (
      <Router>
        <Routes>
          <Route path="/" element={<AmbitionsHome />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/funds" element={<Funds />}></Route>
          <Route path="/profile" element={<ProfileHome />}></Route>
          <Route path="/add" element={<AddAmbition />}></Route>
          <Route path="*" element={<Index />}></Route>
        </Routes>
      </Router>
    ) : (
      <div style={{ textAlign: "center" }}>
        <h1>Open the site on Mobile Device.</h1>
      </div>
    )}
  </>
};

export default App;
