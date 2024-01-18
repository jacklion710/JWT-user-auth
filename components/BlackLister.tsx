// /components/BlackLister.tsx

import { useState, FunctionComponent } from 'react';
import { Text, Button, Input, Box, ChakraProvider, Container, VStack, Heading } from '@chakra-ui/react';
import { COLORS } from '../utils/palette';

const { 
    grey, 
    background, 
    secondary, 
    buttonCol 
} = COLORS;

interface BlackListerProps {
    goToIssuer: () => void;
    goToVerifier: () => void;
  }

const BlackLister: FunctionComponent<BlackListerProps> = ({ goToIssuer, goToVerifier }) => {
  const [token, setToken] = useState('');
  const [blacklistStatus, setBlacklistStatus] = useState({
    message: 'Enter a token to blacklist',
    bgColor: grey
  });

  const blacklistToken = async () => {
    try {
      const response = await fetch('/api/jwt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, action: 'blacklist' }),
      });
  
      if (response.ok) {
        setBlacklistStatus({ 
          message: "Token successfully blacklisted", 
          bgColor: COLORS.accent 
        });
      } else {
        const errorData = await response.json();
        setBlacklistStatus({ 
          message: errorData.error || "Failed to blacklist token", 
          bgColor: COLORS.redPrimary 
        });
      }
    } catch (error) {
      setBlacklistStatus({ 
        message: "Failed to blacklist token", 
        bgColor: COLORS.redPrimary 
      });
    }
  };  

  return (
    <ChakraProvider>
      <Box bg={background} minH="100vh" display="flex" alignItems="center" justifyContent="center"> 
        <Container py={10}>
          <VStack spacing={4} align="center">
            <Heading fontFamily="'Kdam Thmor Pro', sans-serif">BlackLister</Heading>
            <Box bg={`${secondary}20`} p={4} borderRadius="lg" boxShadow="0px 4px 10px rgba(0, 0, 0, 0.5)">
              <VStack spacing={4} align="center">
                <Input 
                  placeholder="Enter JWT to blacklist" 
                  size="lg"
                  w="full"
                  onChange={(e) => setToken(e.target.value)}
                  borderColor={COLORS.primary}
                  bg={`${COLORS.background}A0`} 
                  color={COLORS.text}
                  _hover={{ borderColor: COLORS.accent }}
                  _focus={{ borderColor: COLORS.accent2, boxShadow: `0px 0px 10px ${COLORS.accent2}` }}
                  transition="all 0.3s ease-in-out"
                  borderRadius="20px"
                  fontFamily="'Kdam Thmor Pro', sans-serif"
                />
                <Box position="relative" w="full" display="flex" justifyContent="center">
                  <Box 
                    position="absolute"
                    top="0"
                    left="0"
                    w="full"
                    h="full"
                    bg={`${buttonCol}80`}
                    borderRadius="lg"
                    zIndex="-1"
                  />
                    <Button 
                    onClick={blacklistToken}
                    mt={4}
                    bgColor={`${buttonCol}80`}
                    color={COLORS.text}
                    _hover={{ bg: `${COLORS.accent}80`, transform: 'scale(1.05)' }}
                    _active={{ bg: `${COLORS.neonAccent}80` }}
                    boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
                    border="2px solid"
                    borderColor={COLORS.grey}
                    transition="all 0.3s ease-in-out"
                    borderRadius="20px"
                    minW="200px"
                    w="10vw"
                    >
                    Blacklist Token
                    </Button>
                </Box>
                <Box
                    bg={blacklistStatus.bgColor}
                    p={3}
                    borderRadius="lg"
                    boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
                    my={4}
                    >
                    <Text color={COLORS.secondaryText} fontFamily="'Kdam Thmor Pro', sans-serif">
                        {blacklistStatus.message}
                    </Text>
                </Box>
                <Box position="relative" w="full" display="flex" justifyContent="center">
                  <Box 
                    position="absolute"
                    top="0"
                    left="0"
                    w="full"
                    h="full"
                    bg={`${buttonCol}80`}
                    borderRadius="lg"
                    zIndex="-1"
                  />
                    <Button 
                    onClick={goToIssuer}
                    mt={4}
                    bgColor={`${COLORS.buttonCol}80`}
                    color={COLORS.text}
                    _hover={{ bg: `${COLORS.accent}80`, transform: 'scale(1.05)' }}
                    _active={{ bg: `${COLORS.neonAccent}80` }}
                    boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
                    border="2px solid"
                    borderColor={COLORS.grey}
                    transition="all 0.3s ease-in-out"
                    borderRadius="20px"
                    fontFamily="'Kdam Thmor Pro', sans-serif"
                    minW="200px"
                    w={'10vw'} 
                    >
                    Go To Issuer
                    </Button>
                </Box>
                <Box position="relative" w="full" display="flex" justifyContent="center">
                  <Box 
                    position="absolute"
                    top="0"
                    left="0"
                    w="full"
                    h="full"
                    bg={`${buttonCol}80`}
                    borderRadius="lg"
                    zIndex="-1"
                  />
                    <Button 
                    onClick={goToVerifier}
                    mt={4}
                    bgColor={`${COLORS.buttonCol}80`}
                    color={COLORS.text}
                    _hover={{ bg: `${COLORS.accent}80`, transform: 'scale(1.05)' }}
                    _active={{ bg: `${COLORS.neonAccent}80` }}
                    boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
                    border="2px solid"
                    borderColor={COLORS.grey}
                    transition="all 0.3s ease-in-out"
                    borderRadius="20px"
                    fontFamily="'Kdam Thmor Pro', sans-serif"
                    minW="200px"
                    w={'10vw'} 
                    >
                    Go To Verifier
                    </Button>
                </Box>
              </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default BlackLister;
