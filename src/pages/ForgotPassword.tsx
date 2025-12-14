import { Box, Flex, Text, Title, Button, TextInput, rem } from "@mantine/core";
import logo from "../assets/ADXLOGO.png";
import iconArrow from  "../assets/back-icon.svg";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useLoadingStore from "../store/useLoader";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const ForgotPassword_ENDPOINT = '/password/request-reset'; 
const ForgotPassword_URL = `${BASE_URL.endsWith('/api') ? BASE_URL : BASE_URL + '/api'}${ForgotPassword_ENDPOINT}`;
type forgotpassword = {
  email: string;
}
async function forgotPassword({email} : forgotpassword) {
  if(!BASE_URL) {
    throw new Error("VITE_BACKEND_URL is not defined in environment variables.");
  }
      const response = await fetch(ForgotPassword_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });
        if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Forgot Password failed' }));
        throw new Error(errorData.message || `Forgot Password failed with status: ${response.status}`);
    }
    return response.json();
}
type forgotPasswordError = {
  email ?: string;
}
export default function ForgotPassword() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<forgotPasswordError>({});
  const { setLoading } = useLoadingStore();
    const validateForm = () => {
    const newErrors: forgotPasswordError = {};

    if (!email.trim()) {
      newErrors.email = 'Email required.'; 
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format'; 
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const orangeColor = "#FF9B42";
  const grayColor = "#CFCFCF";
  const whiteColor = "#F8F9FB";
  const darkBlueColor = "#0A1F44";
    const { mutateAsync: loginUserMutation } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      console.log("Verification Successful! Data:", data);
        localStorage.setItem('userEmailForVerification', email);
      notifications.show({
        title: 'Verification Successful!',
        message: 'Your email has been successfully verified.',
        color: 'green',
        autoClose: 5000,
      });

      queryClient.invalidateQueries({queryKey: ["forgotPassword"]});
      setTimeout(() => navigate('/verification'), 500);
    },
    onError: (error) => {
      console.error("Verfiy Error:", error.message);
      notifications.show({
        title: 'Login Failed',
        message: error.message,
        color: 'red',
        autoClose: 5000,
      });
    }
  });
  return (
    <Flex
      direction="column"
      align="center"
      bg={darkBlueColor}
      justify="flex-start"
      h="100vh"
      style={{ padding: '0px 20px 20px' }}
    >
      <Flex align="center" justify={"space-between"} w={"100%"} mb={"70px"}>
      <Box>
        <img src={iconArrow} alt="icon-arrow"/>
      </Box>
      <Box w={{base: rem(99), sm: rem(150)}}>
        <img src={logo} alt="ADX logo" width={150} height={53} style={{ display: 'block', maxWidth: '100%', height: 'auto' }} />
      </Box>
      <Box display={{ base: 'none', sm: 'block' }}></Box>
      </Flex>
      <Title order={1} mb="10px" c={whiteColor} fw={"500"} fz={{ base: rem(25), sm: rem(32) }}>Forgot your password ?</Title>
      <Text c={grayColor} fw={400}  fz={{ base: rem(11), sm: rem(16) }}>
        Please enter your email address. A verification code will be
      </Text>
      <Text c={grayColor} mb="70px" fw={400} fz={{ base: rem(12), sm: rem(16) }}> sent to allow you to change your password.</Text>
              <Box w="100%" maw={800} mb="xl">
                <TextInput
                  label = "What's your email?"
                  placeholder="Enter your email address"
                  required
                  value={email}
                  error= {errors.email}
                  onChange={(e) => {setEmail(e.target.value); setErrors(prev => ({ ...prev, email: undefined }));}}
                  mb={{base: rem("120px"), sm: rem("40px")}}
                  styles={{
                    label: { color: grayColor, marginBottom: "10px" },
                    input: {
                      padding: '22px 24px',
                      borderRadius: '12px',
                      border: `1px solid ${orangeColor}`,
                      background: "none",
                      color: grayColor,
                      '&::placeholder': {
                        color: '#666',
                      },
                    }
                  }}
                />
              </Box>
        
              <Button w="100%" maw={800} size="lg" bg={whiteColor} radius="10px" mb={"30px"}         onClick={async () => {
                        const isValid = validateForm();
                        if (!isValid) {
                          notifications.show({
                              title: 'Input error',
                              message: 'Please review and correct the fields highlighted in red.',
                              color: 'yellow',
                              autoClose: 5000,
                          });
                          return;
                        }
                        setLoading(true);
                        try {
                          await loginUserMutation({ email });
                          setEmail("");
                        } catch (e) {
                          console.error(e);
                        }
                        finally{
                          setLoading(false)
                        }
                      }}>
                <Text c={darkBlueColor} fw={600} size="16px">Send code</Text>
              </Button>
    </Flex>
  );
}