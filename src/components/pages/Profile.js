// src/components/pages/Profile.js
import React from 'react';
import {
  Box,
  Heading,
  Text,
  Avatar,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Card,
  CardBody,
  Flex,
} from '@chakra-ui/react';

const Profile = () => {
  // Sample user data (you can replace this with actual data from your state or API)
  const user = {
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    profileImage: 'https://bit.ly/broken-link', // Replace with actual image URL
  };

  return (
    <Flex justify="center" align="center" height="90vh" flexShrink={0}>
      <Card width="400px" boxShadow="lg" borderRadius="md" p={5}>
        <CardBody>
          <VStack spacing={4} align="center">
            <Heading as="h2" size="lg">
              User Profile
            </Heading>

            {/* Profile Image */}
            <Avatar size="xl" name={user.username} src={user.profileImage} />

            {/* Username Field */}
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input value={user.username} readOnly />
            </FormControl>

            {/* Email Field */}
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input value={user.email} readOnly />
            </FormControl>

            {/* Edit Button (Optional) */}
            <Button colorScheme="teal" mt={4} width="full">
              Edit Profile
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Profile;
