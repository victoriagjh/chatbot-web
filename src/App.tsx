import { ChakraProvider } from '@chakra-ui/react';
import { useState } from 'react';
import theme from "./theme";

import { Navigate, Route, Routes } from 'react-router-dom';
import { ChattingRoom } from './pages/ChattingRoom';
import { Login } from './pages/Login';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/chat" element={isLoggedIn ? <ChattingRoom /> : <Navigate to="/" />} /> */}
        <Route path="/chat" element={<ChattingRoom />} />
      </Routes>
    </ChakraProvider>

  );
}

export default App;
