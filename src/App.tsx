import { ChakraProvider } from '@chakra-ui/react';
import theme from "./theme";

import { Route, Routes } from 'react-router-dom';
import { ChattingRoom } from './pages/ChattingRoom';
import { Login } from './pages/Login';


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<ChattingRoom />} />
      </Routes>
    </ChakraProvider>

  );
}

export default App;
