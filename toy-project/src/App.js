import logo from './logo.svg';
import './App.css';
import SignUpOCR from './components/SignUpOCR.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Main from './components/main.js';
import LabLocation from './components/LabLocation.js';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
          <Main />
    </div>
    </BrowserRouter>
  );
}

export default App;
