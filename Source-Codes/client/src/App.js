import { Route, Routes, Navigate } from "react-router-dom";
import GetStarted from "./Pages/GetStarted";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Preferences from "./Pages/Preferences";
import ProfileSettings from "./Pages/ProfileSettings";

function App() {
  return (
    <Routes>
      <Route path="/getstarted" element={<GetStarted />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/preferences" element={<Preferences />} />
      <Route path="/profilesettings" element={<ProfileSettings />} />
      <Route path="/" element={<Navigate to="/getstarted" />} />
    </Routes>
    
  );
}

export default App;
