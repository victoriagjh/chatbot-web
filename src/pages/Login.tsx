
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { Logo } from '../components/Logo'
import { PasswordField } from '../components/PasswordField'
import { apiPost } from '../utils/requests'
import { useState } from 'react'
import { saveAuthData } from '../utils/auth'
import { useNavigate } from 'react-router-dom';
import LoadingModal from '../components/LoadingModal'
import { SignupModal } from '../components/SignUpModal'


export const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const { isOpen = false, onOpen, onClose } = useDisclosure();

  const signUpModal = useDisclosure();

  const navigate = useNavigate();  // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.

  const handleIdChange = (e: any) => setId(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);

  const goToChattingRoom = () => {
    navigate(`/chat`);  // '/home' 경로로 라우트를 변경합니다.
  };


  const handleLogin = async () => {
    try {
      onOpen();
      const response = await apiPost('/api/auth/login', { username: id, password }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.status !== 200) throw new Error('Login failed');
      const data = response.data;
      saveAuthData(data);
      goToChattingRoom();
      onClose();
    } catch (error) {
      onClose();
      alert('Login failed');
      console.error('Login error:', error);
    }
  };
  return (
    <Box className="App">
      <LoadingModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <SignupModal isOpen={signUpModal.isOpen} onClose={signUpModal.onClose} />
      <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
        <Stack spacing="6">
          <Stack spacing="6">
            <Stack spacing={{ base: '2', md: '3' }} textAlign="center" flexDirection="column" alignItems="center">
              <Logo />
              <Heading size="lg" color="green.300" >Welcome To </Heading>
              <Text size="lg" color="green.300" >Victoree Chatbot Web Application</Text>
              <Text size="lg" color="green.300" >Enjoy Some Film/Drama recommendations with this Chatbot. </Text>
            </Stack>
            <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
              <Heading size={{ base: 'xs', md: 'sm' }}>Log in to your account</Heading>
              <Text color="fg.muted">
                Don't have an account? <Link onClick={signUpModal.onOpen}>Sign up</Link>
              </Text>
            </Stack>
          </Stack>
          <Box
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            bg={{ base: 'transparent', sm: 'bg.surface' }}
            boxShadow={{ base: 'none', sm: 'md' }}
            borderRadius={{ base: 'none', sm: 'xl' }}
          >
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="id">ID</FormLabel>
                  <Input id="id" type="id" value={id} onChange={handleIdChange} />
                </FormControl>
                <PasswordField value={password} onChange={handlePasswordChange} />
              </Stack>
              <Stack spacing="6">
                <Button onClick={handleLogin}>Sign in</Button>
                <HStack>
                  <Divider />
                  <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                    Scipy 2024
                  </Text>
                  <Divider />
                </HStack>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>)
}