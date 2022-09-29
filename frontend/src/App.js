import './App.css';

import { Route, Routes } from 'react-router-dom';

import Main from './pages/Main';
import Login from './pages/Login';
import Regist from './pages/Regist';
import Post from './pages/Post';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/regist" element={<Regist/>} />
      <Route path="/post" element={<Post/>} />
    </Routes>
  );
}

export default App;