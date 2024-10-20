import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/listmanager');
    // Handle login logic here
  };

  return (
    <Box 
      maxW="400px" 
      mx="auto" 
      mt="100px" 
      p={5} 
      borderWidth={1} 
      borderRadius="lg" 
      boxShadow="lg"
      bg="white"
    >
      <Heading as="h2" size="lg" textAlign="center" mb={4}>Login</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl >
          <FormLabel>Email</FormLabel>
          <Input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="youremail@example.com" 
          />
        </FormControl>
        <FormControl  mt={4}>
          <FormLabel>Password</FormLabel>
          <Input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="********" 
          />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit" onClick={handleSubmit} width="full">Login</Button>
      </form>
      <Text mt={4} textAlign="center">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </Text>
    </Box>
  );
}

export default Login;