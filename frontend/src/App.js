import './App.css';

import { Route, Routes } from 'react-router-dom';

import Main from './pages/Main';
import Login from './pages/Login';
import Regist from './pages/Regist';
import Post from './pages/Post';
import PostView from './pages/PostView';
import PostUpdate from './pages/PostUpdate';
import PostList_test from './pages/PostList';
import PostList from './pages/PostList';
import Test from './pages/Test';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/regist" element={<Regist/>} />
      <Route path="/post" element={<Post/>} />
      <Route path="/postView" element={<PostView/>} />
      <Route path="/postUpdate" element={<PostUpdate/>} />
      <Route path="/postList" element={<PostList/>} />
      {/* <Route path="/PostList_test" element={<PostList_test/>} /> */}
      <Route path="/test" element={<Test/>} />
    </Routes>
  );
}

export default App;