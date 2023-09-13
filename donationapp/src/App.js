import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import './App.css';
import DonationPage from './DonationPage';
import PaymentSuccess from './PaymentSuccess';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DonationPage/>} />
        <Route path="/paymentsuccess" element={<PaymentSuccess/>} />
      </Routes>
    </Router>
  );
}

export default App;
