import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import AllCertifications from './Pages/AllCertifications/AllCertifications';
import Navbar from './Components/Navbar/Navbar'
function App() {

  return (
    <>
      <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={<AllCertifications />} />
      </Routes>
    </Router>
    </>
  )
}

export default App