import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import theme from "./theme";
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
} from '@chakra-ui/react'
import { PasswordField } from './PasswordField';
import { Logo } from './Logo';

function App() {
  return (
    <ChakraProvider theme={theme}>
    <Box className="App">
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
    <Stack spacing="8">
      <Stack spacing="6">
      <Stack spacing={{ base: '2', md: '3' }} textAlign="center" flexDirection="column" alignItems="center">
      <Logo />

        <Heading size="lg" color="green.300" >Welcome To </Heading>
        <Text size="lg" color="green.300" >Victoree Chatbot Web Application</Text>
      </Stack>
        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
          <Heading size={{ base: 'xs', md: 'sm' }}>Log in to your account</Heading>
          <Text color="fg.muted">
            Don't have an account? <Link href="#">Sign up</Link>
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
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" type="email" />
            </FormControl>
            <PasswordField />
          </Stack>
          <Stack spacing="6">
            <Button>Sign in</Button>
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
    </Box>
    </ChakraProvider>

  );
}

export default App;
