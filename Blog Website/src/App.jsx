import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import Login from './pages/Login';
import { useState } from 'react';
import Navbar from "./components/Navbar";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
    <>
      <div>
        <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
        <div className="App">
          <Routes>
            {/* Pass isAuth as a prop inside the element prop */}
            <Route path="/" element={<Home isAuth={isAuth} />} />
            <Route path="/post" element={<Post isAuth={isAuth} />} />
            <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
