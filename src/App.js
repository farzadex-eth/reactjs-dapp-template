import './App.css';
import Navbar from './components/Navbar';
import TestContract from './components/TestContract';
import { ContractProvider } from './ContractContext';
import { WalletProvider } from './WalletContext';

function App() {
  return (
    <div className="App">
      <WalletProvider>
        <ContractProvider>
          <Navbar />
          <TestContract />
        </ContractProvider>
      </WalletProvider>
    </div>
  );
}

export default App;
