import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import AllCertifications from './Pages/AllCertifications/AllCertifications';
import { ToastContainer } from "react-toastify";
import Navbar from './Components/Navbar/Navbar';
import UserDashboard from './Pages/UserDashboard/UserDashboard';
function App() {

  return (
    <>
      <Router>
        <Navbar/>
        <ToastContainer 
        position="top-right" 
        autoClose={5000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
      <Routes>
        <Route path="/" element={<AllCertifications />} />
        <Route path="/user" element={<UserDashboard />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
