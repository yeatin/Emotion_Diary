import Login from './routes/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [password, setPassword] = useState("");
  useEffect(() => {
    setPassword("test");
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login password={password} setPassword={setPassword} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
