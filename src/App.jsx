import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/Login.jsx'
import SignUpPage from './pages/SignUp.jsx';
import GoogleCallback from "./pages/LoginGoogle.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Layout from "./pages/Layout.jsx";
import './App.css'

const App = () => {
  return (
    <Router>
      <Layout>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/google-callback" element={<GoogleCallback />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

      </Routes>
      </Layout>
    </Router>
  );
};

export default App
