"use client"
import { 
  useState, 
  useEffect,
  FunctionComponent 
} from 'react';
import { 
  Text, 
  Select, 
  Button, 
  Box, 
  ChakraProvider, 
  Container, 
  VStack, 
  HStack, 
  Heading,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useToast } from '@chakra-ui/react';
import { COLORS } from '../utils/palette';
import Head from 'next/head';

const { 
  primary,
  secondaryText,
  background, 
  secondary, 
  grey, 
  buttonCol, 
  accent,
  redPrimary, 
  redSecondary 
} = COLORS;

interface IssuerProps {
  onVerify: () => void;
}

const Issuer: FunctionComponent<IssuerProps> = ({ onVerify }) => {
  const [selectedClass, setSelectedClass] = useState('');
  const [tokenStatus, setTokenStatus] = useState('No token issued');
  const [statusBoxBg, setStatusBoxBg] = useState(`${grey}80`); 
  const [isTokenIssued, setIsTokenIssued] = useState(false);
  const [tokenExpiration, setTokenExpiration] = useState(60);
  const [isInteracting, setIsInteracting] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsTokenIssued(true);
    }
  }, []);

  const handleClassChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
  };

  const issueToken = async () => {
    if (!selectedClass) {
      toast({
        title: 'Selection Missing',
        description: 'Please select a class from the dropdown.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return; // Early return to prevent further execution
    }
  
    try {
      const response = await fetch('/api/jwt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ class: selectedClass, exp: tokenExpiration }),
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log('Token:', data.token);
        localStorage.setItem('token', data.token); 
        setIsTokenIssued(true);
        setTokenStatus(`Token issued for class: ${selectedClass}`);    
        setStatusBoxBg(`${accent}80`);   
  
        toast({
          title: 'Token Issued',
          description: 'Your token has been successfully issued.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
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
    setIsTokenIssued(false);
    setTokenStatus('No token issued'); 
    setStatusBoxBg(`${grey}80`); 
    console.log("Token deleted.");
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
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Kdam+Thmor+Pro&display=swap" rel="stylesheet" />
      </Head>
      <Box bg={background} minH="100vh" display="flex" alignItems="center" justifyContent="center"> 
      <VStack>
      <Heading fontFamily="'Kdam Thmor Pro', sans-serif">JSON Web Token Issuer</Heading>
        <Container py={10}>
          <Box bg={`${primary}20`} p={4} borderRadius="lg" boxShadow="0px 4px 10px rgba(0, 0, 0, 0.5)">
            <VStack spacing={4} align="center" width="full">
              <Box position="relative" w="full">
                <Box 
                  position="absolute"
                  top="0"
                  left="0"
                  w="full"
                  h="full"
                  bg={`${secondary}80`}
                  borderRadius="lg"
                  zIndex="-1"
                />
                <Select 
                  placeholder="Select a class" 
                  onChange={handleClassChange}
                  borderColor={COLORS.primary}
                  bg={`${COLORS.background}A0`} 
                  color={COLORS.text}
                  _hover={{ borderColor: COLORS.accent }}
                  _focus={{ borderColor: COLORS.accent2, boxShadow: `0px 0px 10px ${COLORS.accent2}` }}
                  transition="all 0.3s ease-in-out"
                  borderRadius="20px"
                  size="lg"
                  w="full"
                  fontFamily="'Kdam Thmor Pro', sans-serif"
                >
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="fish">Fish</option>
                  <option value="bird">Bird</option>
                </Select>
              </Box>
              <HStack spacing={20} mr={45}>
                <VStack>
                  {/* Semi-transparent box for "Issue my token" button */}
                  <Box position="relative" w="full">
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
                      mt={4}
                      onClick={issueToken}
                      bgColor={`${COLORS.buttonCol}80`}
                      color={COLORS.text}
                      _hover={{ bg: `${COLORS.accent}80`, transform: 'scale(1.05)' }}
                      _active={{ bg: `${COLORS.neonAccent}80` }}
                      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
                      border="2px solid"
                      borderColor={COLORS.grey}
                      transition="all 0.3s ease-in-out"
                      borderRadius="20px"
                      m={2}
                      p={2}
                      minW="200px"
                      w="10vw"
                      fontFamily="'Kdam Thmor Pro', sans-serif"
                    >
                      Issue my token
                    </Button>
                  </Box>
                  {/* Semi-transparent box for "Delete my token" button */}
                  <Box position="relative" w="full">
                    <Box 
                      position="absolute"
                      top="0"
                      left="0"
                      w="full"
                      h="full"
                      bg={`${redPrimary}80`}
                      borderRadius="lg"
                      zIndex="-1"
                    />
                    <Button 
                      colorScheme="red" 
                      mt={4} 
                      onClick={deleteToken}
                      bgColor={`${redPrimary}80`}
                      color="white"
                      _hover={{ bg: `${redSecondary}80`, transform: 'scale(1.05)' }} 
                      _active={{ bg: "red.700" }}
                      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)" 
                      border="2px solid"
                      borderColor="red.500" 
                      transition="all 0.3s ease-in-out" 
                      borderRadius="20px" 
                      m={2}
                      p={2}
                      minW="200px"
                      w={'10vw'} 
                      fontFamily="'Kdam Thmor Pro', sans-serif"
                    >
                      Delete my token
                    </Button>
                  </Box>
                  <Box my={4}>
                  <Text mb={2}>Token Expiration: {tokenExpiration} seconds</Text>
                  <Slider
                    defaultValue={60}
                    min={60}
                    max={25920000} // 300 days in seconds
                    step={60}
                    onChange={(val) => setTokenExpiration(val)}
                    _hover={{ transform: 'scale(1.05)' }}
                    _active={{ bg: `${accent}60` }}
                    boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
                    border="2px solid"
                    borderColor={grey}
                    transition="all 0.3s ease-in-out"
                    borderRadius="full"
                  >
                    <SliderTrack
                      bg={`${buttonCol}80`}
                      borderRadius="full"
                      position="relative"
                      h="8px"
                    >
                      <SliderFilledTrack bg={isInteracting ? `${accent}80` : `${primary}60`}/>
                    </SliderTrack>
                    <SliderThumb 
                      color={primary}
                      bgColor={`${primary}90`}
                      boxSize={6}
                      border="1.5px solid"
                      borderColor={grey}
                      boxShadow="0px 2px 5px rgba(0, 0, 0, 0.2)"
                      _hover={{
                        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.3)'
                      }}
                      _active={{
                        bg: `${accent}CC`
                      }}
                      h='2.5vh'
                      w='1vh'
                    />
                  </Slider>
                </Box>
                </VStack>
                <VStack>
                <Box bg={statusBoxBg} p={4} borderRadius="lg" boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)">
                  <Text textAlign='center' color={secondaryText} fontSize="lg" fontFamily="'Kdam Thmor Pro', sans-serif">
                    {tokenStatus}
                  </Text>
                </Box>
                {/* Semi-transparent box for "Verify token" button */}
                <Box position="relative" w="full">
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
                    {isTokenIssued && (
                      <Button 
                        onClick={onVerify}
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
                        Verify token
                      </Button>
                    )}
                  </Box>
                </VStack>
              </HStack>
            </VStack>
          </Box>
        </Container>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Issuer;
