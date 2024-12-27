import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/Login.jsx'
import SignUpPage from './pages/SignUp.jsx';
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
};

export default App
