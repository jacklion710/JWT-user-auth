"use client"
import { useState } from 'react';
import { Select, Button, Box, ChakraProvider } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useToast } from '@chakra-ui/react';

const Home = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const toast = useToast();

  const handleClassChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
  };

  const issueToken = async () => {
    try {
      const response = await fetch('/api/jwt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ class: selectedClass }),
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log('Token:', data.token);
        toast({
          title: 'Token Issued',
          description: 'Your token has been successfully issued.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        // Additional logic to handle the token
      } else {
        console.error('Failed to generate token:', data.error);
        toast({
          title: 'Error',
          description: 'Failed to generate token.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }      
    } catch (error) {
      console.error('Error issuing token:', error);
    }
  };  

  const deleteToken = () => {
    localStorage.removeItem('token');
    toast({
      title: 'Token Deleted',
      description: 'Your token has been successfully deleted.',
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <ChakraProvider>
      <Box>
        <Select placeholder="Select a class" onChange={handleClassChange}>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="fish">Fish</option>
          <option value="bird">Bird</option>
        </Select>
        <Button colorScheme="blue" mt={4} onClick={issueToken}>
          Issue my token
        </Button>
        <Button colorScheme="red" mt={4} onClick={deleteToken}>
          Delete my token
        </Button>
      </Box>
    </ChakraProvider>
  );
};

export default Home;
