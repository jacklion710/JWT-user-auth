import { 
  useState, 
  FunctionComponent 
} from 'react';
import { 
  Text, 
  Button, 
  Input,
  Box, 
  ChakraProvider, 
  Container, 
  VStack, 
  Heading 
} from '@chakra-ui/react';
import { COLORS } from '../utils/palette';
import Head from 'next/head';

const { 
  secondaryText,
  background, 
  secondary, 
  grey,
  accent
} = COLORS;

interface VerifierProps {
  onBack: () => void;
}

const Verifier: FunctionComponent<VerifierProps> = ({ onBack }) => {
  const [token, setToken] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');

  // Function to simulate token verification
  async function verifyJWT(token: string) {
    // Replace with actual JWT verification logic
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        token ? resolve("Valid") : reject(new Error("Invalid token"));
      }, 1000); // Simulate an async operation
    });
  }

  const verifyToken = async () => {
    try {
      const result = await verifyJWT(token);
      setVerificationStatus(`Token is valid: ${result}`);
    } catch (error) {
      console.error('Error verifying token:', error);
      // Replace toast calls with console.log or another method of displaying messages
      console.log('Error: Invalid token.');
      setVerificationStatus('Invalid token.');
    }
  };

  return (
    <ChakraProvider>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Kdam+Thmor+Pro&display=swap" rel="stylesheet" />
      </Head>
      <Box bg={background} minH="100vh" display="flex" alignItems="center" justifyContent="center"> 
        <Container py={10}>
          <VStack spacing={4} align="center">
            <Heading fontFamily="'Kdam Thmor Pro', sans-serif">JSON Web Token Verifier</Heading>
            <Input 
              placeholder="Enter JWT here" 
              size="lg"
              w="full"
              fontFamily="'Kdam Thmor Pro', sans-serif"
              borderColor={grey}
              onChange={(e) => setToken(e.target.value)}
            />
            <Button 
              onClick={verifyToken}
              bgColor={`${accent}80`}
              color={secondaryText}
              _hover={{ bg: `${accent}80`, transform: 'scale(1.05)' }}
              boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
              transition="all 0.3s ease-in-out"
              borderRadius="20px"
              fontFamily="'Kdam Thmor Pro', sans-serif"
              size="lg"
            >
              Verify Token
            </Button>
            <Button 
              onClick={onBack}
              bgColor={`${accent}80`}
              color={secondaryText}
              _hover={{ bg: `${accent}80`, transform: 'scale(1.05)' }}
              boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
              transition="all 0.3s ease-in-out"
              borderRadius="20px"
              fontFamily="'Kdam Thmor Pro', sans-serif"
              size="lg"
            >
              Back to Issuer
            </Button>
            <Box bg={`${secondary}80`} p={4} borderRadius="lg" boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)">
              <Text textAlign='center' color={secondaryText} fontSize="lg" fontFamily="'Kdam Thmor Pro', sans-serif">
                {verificationStatus}
              </Text>
            </Box>
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default Verifier;
