import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import AllCertifications from './Pages/AllCertifications/AllCertifications';
function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<AllCertifications />} />
      </Routes>
    </Router>
    </>
  )
}

export default App