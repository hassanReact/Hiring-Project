import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/Dashboard';
import EmailInputPage from './pages/EmailPage';
import OtpVerificationPage from './pages/OtpVerification';
import RoleSelectionPage from './pages/RoleSelection';

function AppRouter() {

  return (
    <Routes>
      <Route path="/" element={<EmailInputPage />} />
      <Route path="/verify-otp" element={<OtpVerificationPage />} />
      <Route path="/select-role" element={<RoleSelectionPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}

export default App;
