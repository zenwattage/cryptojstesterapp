
import './App.css';
// import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { DecryptionExample } from './components/DecryptionExample';
import { EncryptionExample } from './components/EncryptionExample';



function App() {
  return (
    <div className="App">
      <EncryptionExample />
      <DecryptionExample />
    </div>
  );
}

export default App;
