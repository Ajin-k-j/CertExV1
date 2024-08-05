import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import AllCertifications from './Pages/AllCertifications/AllCertifications';
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
function App() {

  return (
    <>
      <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={<AllCertifications />} />
      </Routes>
      <Footer />
    </Router>
    </>
  )
}

export default App