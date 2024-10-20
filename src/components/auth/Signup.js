import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
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
      {/* Welcome Heading */}
      <Heading as="h1" size="xl" textAlign="center" mb={4}>
        Welcome to Taskify
      </Heading>
      <Text fontSize="lg" textAlign="center" mb={6}>
        Create an account to get started
      </Text>

      {/* Signup Form */}
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="youremail@example.com" 
          />
        </FormControl>
        <FormControl isRequired mt={4}>
          <FormLabel>Username</FormLabel>
          <Input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Your Username" 
          />
        </FormControl>
        <FormControl isRequired mt={4}>
          <FormLabel>Password</FormLabel>
          <Input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="********" 
          />
        </FormControl>
        <FormControl isRequired mt={4}>
          <FormLabel>Confirm Password</FormLabel>
          <Input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            placeholder="********" 
          />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit" width="full">Sign Up</Button>
      </form>
      <Text mt={4} textAlign="center">
        Already have an account? <Link to="/login">Login</Link>
      </Text>
    </Box>
  );
}

export default Signup;