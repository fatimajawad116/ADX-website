import { useMutation, useQueryClient } from "@tanstack/react-query";
import logo from "../assets/ADXLOGO.png";
import iconArrow from  "../assets/back-icon.svg";
import useLoadingStore from "../store/useLoader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { Anchor, Box, Button, Flex, rem, Text, TextInput, Title } from "@mantine/core";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const VERIFY_ENDPOINT = '/password/verify-code'; 
const VERIFY_URL = `${BASE_URL.endsWith('/api') ? BASE_URL : BASE_URL + '/api'}${VERIFY_ENDPOINT}`;
type VerifyCodePayload = {
  code: string;
  email: string;
};
type VerifyCodeSuccessData = {
  message: string;
  token: string; 
}
async function VerifyCode({ code, email }: VerifyCodePayload): Promise<VerifyCodeSuccessData> {
  if (!BASE_URL) {
    throw new Error("VITE_BACKEND_URL is not defined in environment variables.");
  }

  const response = await fetch(VERIFY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code, email }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Verification failed' }));
    throw new Error(errorData.message || `Verify failed with status: ${response.status}`);
  }
  return response.json();
}
type VerifyCodeError = {
  code?: string;
};

export default function Verification() {
    const queryClient = useQueryClient();
  const [verifyCode, setVerifyCode] = useState('');
  const [errors, setErrors] = useState<VerifyCodeError>({});
    const navigate = useNavigate();
  const { setLoading } = useLoadingStore(); 
    const validateForm = () => {
    const newErrors: VerifyCodeError = {};
    if (!verifyCode.trim()) {
      newErrors.code = 'Verification code is required.'; 
    } 
    else if (!/^\d{6}$/.test(verifyCode.trim())) { 
      newErrors.code = 'Invalid code format. The code must be 6 digits.'; 
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const orangeColor = "#FF9B42";
  const grayColor = "#CFCFCF";
  const whiteColor = "#F8F9FB";
  const darkBlueColor = "#0A1F44";
  const { mutateAsync: VerifyCodeMutation } = useMutation({
    mutationFn: VerifyCode,
    onSuccess: (data) => {
      console.log("Verify successful! Data:", data);
      if (data.token) {
      localStorage.setItem('authToken', data.token);
      console.log("Token saved to localStorage.");
    }
      notifications.show({
        title: 'Verification Successful!', 
        message: 'Your email has been successfully verified.',
        color: 'green',
        autoClose: 5000,
      });
      queryClient.invalidateQueries({ queryKey: ["registerUser"] }); 
    setTimeout(() => navigate('/resetPassword'), 500);
      localStorage.removeItem('userEmailForVerification');
    },

    onError: (error) => {
      console.error("Verification Error:", error.message);
      notifications.show({
        title: 'Verification Failed', 
        message: error.message,
        color: 'red',
        autoClose: 5000,
      });
    }
  });
  const storedEmail = localStorage.getItem('userEmailForVerification');
  const goBack = () => {
    navigate(-1);
  };
  return (
    <Flex
      direction="column"
      align="center"
      bg={darkBlueColor}
      justify="flex-start"
      h="100vh"
      style={{ padding: '0 20px 20px' }}
    >
      <Flex  align="center" justify={"space-between"} w={"100%"} mb={"70px"}>
      <Box onClick={goBack} style={{ cursor: 'pointer' }}>
        <img src={iconArrow} alt="icon-arrow"/>
      </Box>
      <Box w={{base: rem(99), sm: rem(150)}}>
        <img src={logo} alt="ADX logo" width={150} height={53} style={{ display: 'block', maxWidth: '100%', height: 'auto' }} />
      </Box>
      <Box display={{ base: 'none', sm: 'block' }}></Box>
      </Flex>
      <Title order={1} mb="15px" c={whiteColor} fw={"500"} fz={{ base: rem(28), sm: rem(32) }}>Forgot your password ?</Title>
      <Text fz={{ base: "14px", sm: "16px" }} c={grayColor} fw={400} mb={"71px"}>
       Please check your email for the code.
      </Text>
              <Box w="100%" maw={800} mb="70px">
                <TextInput
                  placeholder="Enter your verification code"
                            required
          error={errors.code} 
          value={verifyCode}
          onChange={(e) => {
            setVerifyCode(e.target.value);
            setErrors(prev => ({ ...prev, code: undefined }));
          }}
                  mb="40px"
                  styles={{
                    label: { color: grayColor },
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
              message: 'Please review and correct the field highlighted in red.',
              color: 'yellow',
              autoClose: 5000,
            });
            return;
          }
          if (!storedEmail) {
            notifications.show({
            title: 'Error',
            message: 'Email not found. Please go back and re-register.',
            color: 'red',
            autoClose: 5000,
            });
            return;
            }
          setLoading(true);
          try {
            await VerifyCodeMutation({ code: verifyCode, email: storedEmail }); 
            setVerifyCode("");
          } catch (e) {
            console.error("Mutation failed:", e); 
          }
          finally {
            setLoading(false);
          }
        }}>
                <Text c={darkBlueColor} fw={600} size="16px">Continue</Text>
              </Button>
                                            <Text size="16px" c={whiteColor} fw={400} mb="30px">
                                Didn’t get the code?  <Anchor href="#" c={whiteColor} fw={"600"}>Resend</Anchor>
                              </Text>
    </Flex>
  );
}