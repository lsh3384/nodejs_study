import './App.css';

import { Route, Routes } from 'react-router-dom';

import Main from './pages/Main';
import Login from './pages/Login';
import Request from './pages/Request';
import Company from './pages/Company';
import Regist from './pages/Regist';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/regist" element={<Regist/>} />
      <Route path="/request" element={<Request/>}/>
      <Route path="/company" element={<Company/>}/>
    </Routes>
  );
}

export default App;