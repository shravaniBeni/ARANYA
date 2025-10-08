import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";

import HomePage from "./pages/homepage";
import { HowItWorksSection } from "./components/how-it-works-section";
import SignUpPage from "./components/signup/page";
import SignInForm from "./pages/login";
import CentralAgencySignUp from "./components/signup/central-agency/page";
import FieldOfficerSignUp from "./components/signup/field-officer/page";
import NGOSignUp from "./components/signup/ngo/page";
import PlanningDevelopmentSignUp from "./components/signup/planning-development/page";
import Map from "./pages/map.jsx";

import DashboardLayout from "./components/Dashbaord/Layout.js";
import Analytics from "./components/Dashbaord/Analytics.js";
import Claims from "./components/Dashbaord/claims.js";
import Schemes from "./components/Dashbaord/Schemes.js";
// import Atlas from "./components/Dashbaord/atlas.js";
import VoiceFeedback from "./components/Dashbaord/Voicefeedback.js";

import "./styles/header.scss";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/howitworks" element={<HowItWorksSection />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/login"
          element={
            <SignInForm
              userType={{
                id: "default",
                title: "User",
                description: "Sign in to your account.",
                color: "green",
                iconColor: "green",
              }}
            />
          }
        />
        <Route
          path="/signup/central-agency"
          element={<CentralAgencySignUp />}
        />
        <Route path="/signup/field-officer" element={<FieldOfficerSignUp />} />
        <Route path="/signup/ngo" element={<NGOSignUp />} />
        <Route
          path="/signup/planning-development"
          element={<PlanningDevelopmentSignUp />}
        />
        {/* <Route path="/map" element={<Map />} /> */}

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Analytics />} /> {/* default page */}
          <Route path="analytics" element={<Analytics />} />
          <Route path="claims" element={<Claims />} />
          <Route path="schemes" element={<Schemes />} />
          <Route path="atlas" element={<Map />} />
          <Route path="voice-feedback" element={<VoiceFeedback />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
