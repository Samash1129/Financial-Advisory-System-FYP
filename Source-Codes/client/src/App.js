import { Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import GetStarted from "./Pages/GetStarted";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Preferences from "./Pages/Preferences";
import ProfileSettings from "./Pages/ProfileSettings";
import DashRegular from "./Pages/DashRegular";
import DashPremium from "./Pages/DashPremium";
import Payment from "./Pages/Payment";

function App() {

  const filteredData = [
    { name: 'Meezan Bank Ltd', symbol: 'MEZN', price: '797,022', category: 'Banking' },
    { name: 'Silk Bank Ltd', symbol: 'SILK', price: '37,020', category: 'Banking' },
    { name: 'Askari Bank Ltd', symbol: 'AKBL', price: '48,354', category: 'Banking' },
    { name: 'Habib Bank Limited', symbol: 'HBL', price: '797,022', category: 'Banking' },
    { name: 'Dubai Islamic Bank', symbol: 'DIB', price: '37,020', category: 'Banking' },
  ];
  
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/GetStarted" element={<GetStarted />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/preferences" element={<Preferences />} />
      <Route path="/profilesettings" element={<ProfileSettings />} />
      <Route path="/dashregular" element={<DashRegular filteredData={filteredData} />} />
      <Route path="/dashpremium" element={<DashPremium filteredData={filteredData} />} />
      <Route path="/payment" element={<Payment />} />

      {/* <Route path="/" element={<Navigate to="/GetStarted" />} /> */}
    </Routes>
    
  );
}

export default App;