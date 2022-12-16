import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';
function App() {
  return (
    <Routes>
      <Route path="login" element={<Login/>} />
      <Route path="register" element={<Register/>} />
      <Route path="chat" element={<Chat/>} />
    </Routes>
    
  );
}

export default App;
