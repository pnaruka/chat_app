import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector(getUser);
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
