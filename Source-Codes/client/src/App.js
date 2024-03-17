import { Route, Routes, Navigate } from "react-router-dom";
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
    { name: 'Amazon.com, Inc', symbol: 'AMZN', price: '37,020', category: 'Technology' },
    { name: 'Pakistan Stock Exchange', symbol: 'PSX', price: '48,354', category: 'Stocks' },
    { name: 'Habib Bank Limited', symbol: 'HBL', price: '797,022', category: 'Banking' },
    { name: 'Tesla', symbol: 'TSL', price: '37,020', category: 'Technology' },
  ];
  
  return (
    <Routes>
      <Route path="/" element={<GetStarted />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/preferences" element={<Preferences />} />
      <Route path="/profilesettings" element={<ProfileSettings />} />
      <Route path="/dashregular" element={<DashRegular filteredData={filteredData} />} />
      <Route path="/dashpremium" element={<DashPremium filteredData={filteredData} />} />
      <Route path="/payment" element={<Payment />} />

      {/* <Route path="/" element={<Navigate to="/signin" />} /> */}
    </Routes>
    
  );
}

export default App;