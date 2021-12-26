import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useSelector, useDispatch } from 'react-redux';
import PostList from "./pages/PostList";
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreatePost from './pages/CreatePost'
import PostDetail from './pages/PostDetail'
import {GuestPage, PrivatePage} from "./components/RulePage"
import { fetchUserInfo } from './redux/userSlice';

function App() {
  const status = useSelector(state => state.auth.status);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch]);

  if (status === "idle" || status === "loading") return <div>Full page loading...</div>

  if (status === "error") return <div>Error</div>

  return (
      <Routes>
        <Route path="/" element={<PostList/>} />
        <Route path="/posts/:id" element={<PostDetail/>} />
        
        <Route element={<PrivatePage/>}>
          <Route path="/posts/create" element={<CreatePost/>} />
        </Route>

        <Route element={<GuestPage/>}>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Route>
       
        <Route path="*" element={<div>404 page</div>} />
      </Routes>
  );
}

export default App;
