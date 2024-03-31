import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useDispatch, useSelector } from "react-redux";
import { assignUSer, getUser } from "./contexts_store/reducer/user";
import { useEffect } from "react";
import readToken from "./utils/useReadToken";

function App() {
  const user = useSelector(getUser);
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(assignUSer(readToken()));
  },[dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={user?(<HomePage />):(<Navigate to="/login"/>)} />
        <Route path="/login" element={!user?(<Login />):(<Navigate to="/"/>)} />
        <Route path="/signup" element={!user ? (<Signup />):(<Navigate to="/"/>)} />
        <Route path="/chats" element={user?(<ChatPage />):(<Navigate to="/login"/>)} />
      </Routes>
    </div>
  );
}

export default App;
