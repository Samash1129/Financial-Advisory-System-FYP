import {
  Route,
  Routes,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import GetStarted from "./Pages/GetStarted";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Preferences from "./Pages/Preferences";
import ProfileSettings from "./Pages/ProfileSettings";
import Dashboard from "./Pages/Dashboard";
import Payment from "./Pages/Payment";
import PrivateRoute from "./Components/PrivateRoute";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store/store';
import { bankNames } from './constants';


function App() {
  const filteredData = bankNames;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" index={true} element={<LandingPage />} />
        <Route path="/getstarted" element={<GetStarted />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="" element={<PrivateRoute />}>
        <Route path="/preferences" element={<Preferences />} />
          <Route path="/profilesettings" element={<ProfileSettings />} />
          <Route
            path="/dashboard"
            element={<Dashboard filteredData={filteredData} />}
          />
          <Route path="/payment" element={<Payment />} />
        </Route>
      </>
    )
  );

  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
}

export default App;
