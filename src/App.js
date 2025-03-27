import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/login';
import SignUpPage from './pages/signIn';
import MainPage from './pages/main';
import DepositPage from './pages/deposit';
import WithdrawPage from './pages/withdraw';
import TransferPage from './pages/transfer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/deposit" element={<DepositPage />} />
        <Route path="/withdraw" element={<WithdrawPage />} />
        <Route path="/transfer" element={<TransferPage />} />
      </Routes>
    </Router>
  );
}

export default App;
