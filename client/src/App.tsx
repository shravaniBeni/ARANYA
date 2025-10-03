import { BrowserRouter, Routes, Route } from "react-router-dom";
import "leaflet/dist/leaflet.css";

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

import DashboardLayout from "./components/Dashboard/layout";
import Analytics from "./components/Dashboard/Analytics";
import Claims from "./components/Dashboard/claims";
import Schemes from "./components/Dashboard/Schemes";
import Atlas from "./components/Dashboard/Atlas";
import VoiceFeedback from "./components/Dashboard/voicefeedback";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages */}
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

        {/* Dashboard routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Analytics />} /> {/* default page */}
          <Route path="analytics" element={<Analytics />} />
          <Route path="claims" element={<Claims />} />
          <Route path="schemes" element={<Schemes />} />
          <Route path="atlas" element={<Atlas />} />
          <Route path="voice-feedback" element={<VoiceFeedback />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
