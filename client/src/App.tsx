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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
