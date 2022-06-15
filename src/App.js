import Login from './routes/Login';
import View from './routes/View';
import Edit from './routes/Edit';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

const App = () => {
  const [password, setPassword] = useState("");
  const isVerified = document.cookie.split("=")[1];

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login password={password} setPassword={setPassword} />} />
        {
          isVerified === "true" ?
            <>
              <Route path="/view" element={<View />} />
              <Route path="/edit" element={<Edit />} />
            </>
            : <></>
        }
      </Routes>
    </HashRouter>
  );
}

export default App;
