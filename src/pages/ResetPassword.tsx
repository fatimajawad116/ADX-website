import { Box, Flex, Text, Title, Button, PasswordInput, rem } from "@mantine/core";
import logo from "../assets/ADXLOGO.png";
import iconArrow from "../assets/back-icon.svg";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useLoadingStore from "../store/useLoader";
import { notifications } from "@mantine/notifications";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const RestForgotPassword_ENDPOINT = '/password/reset';
const RestForgotPassword_URL = `${BASE_URL.endsWith('/api') ? BASE_URL : BASE_URL + '/api'}${RestForgotPassword_ENDPOINT}`;
type RestForgotPassword = {
 new_password: string;
 new_password_confirmation: string;
 token: string;
};
async function RestPassword({ new_password, new_password_confirmation, token }: RestForgotPassword) {
 if (!BASE_URL) {
 throw new Error("VITE_BACKEND_URL is not defined in environment variables.");
 }
 const response = await fetch(RestForgotPassword_URL, {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json',
 },
body: JSON.stringify({ new_password, new_password_confirmation, token }),
});

 if (!response.ok) {
 const errorData = await response.json().catch(() => ({ message: 'Reset Password failed' }));
 throw new Error(errorData.message || `Reset Password failed with status: ${response.status}`);
 }
 return response.json();
}
type RestForgotPasswordError = {
 new_password?: string;
new_password_confirmation?: string;
};
export default function ResetPassword() {
 const queryClient = useQueryClient();
 const navigate = useNavigate();
 const { setLoading } = useLoadingStore(); 
 const [password, setPassword] = useState('');
 const [passwordCofirm, setPasswordConfirm] = useState('');
const [errors, setErrors] = useState<RestForgotPasswordError>({});
 const orangeColor = "#FF9B42";
 const grayColor = "#CFCFCF";
 const whiteColor = "#F8F9FB";
 const darkBlueColor = "#0A1F44";
 const validateForm = () => {
 const newErrors: RestForgotPasswordError = {};
 if (!password.trim()) {
 newErrors.new_password = 'this input is required.'; 
 } 
 if (!passwordCofirm.trim()) { 
 newErrors.new_password_confirmation = 'this input is required.'; 
 } else if (password !== passwordCofirm) {
        newErrors.new_password_confirmation = 'Passwords do not match.';
    }
 setErrors(newErrors);
 return Object.keys(newErrors).length === 0;
 };
const { mutateAsync: ResetPasswordMutation } = useMutation({
 mutationFn: RestPassword,
onSuccess: (data) => {
console.log("Reset Password successful! Data:", data);
 notifications.show({
 title: 'Reset Password Successful!', 
 message: 'Your password has been changed.',
 color: 'green',
 autoClose: 5000,
});
queryClient.invalidateQueries({ queryKey: ["ResetPassword"] }); 
 setTimeout(() => navigate('/login'), 500);
 },
 onError: (error) => {
 console.error("Reset Password Error:", error.message);
notifications.show({
 title: 'Reset Password Failed', 
message: error.message,
color: 'red',
autoClose: 5000,
});
}
});
const storedEmail = 'placeholder@example.com'; 

 return (
 <Flex
 direction="column"
 align="center"
bg={darkBlueColor}
 justify="flex-start"
 h="100vh"
style={{ padding: '0 20px 20px' }}
 >
 <Flex align="center" justify={"space-between"} w={"100%"} mb={"50px"}>
 <Box>
 <img src={iconArrow} alt="icon-arrow"/>
 </Box>
 <Box w={{base: rem(99), sm: rem(150)}}>
 <img src={logo} alt="ADX logo" width={150} height={53} style={{ display: 'block', maxWidth: '100%', height: 'auto' }} />
 </Box>
 <Box display={{ base: 'none', sm: 'block' }}></Box>
</Flex>
<Title order={1} mb="xs" c={whiteColor} fw={"500"} fz={{ base: rem(28), sm: rem(32) }}>Reset your password</Title>
 <Text size="16px" c={grayColor} mb="89px" fw={400} fz={{ base: "14px", sm: "16px" }}>
 Create a new password for your account.
</Text>
 <Box w="100%" maw={800} mb="70px">
<PasswordInput
placeholder="Enter your password"
 required
value={password}
 error={errors.new_password}
 onChange={(e) => {
 setPassword(e.target.value);
setErrors(prev => ({ ...prev, new_password: undefined }));
 }}
 mb="70px"
styles={{
label: { color: grayColor },
input: {
 padding: '22px 24px',
 borderRadius: '12px',
 border: `1px solid ${errors.new_password ? 'red' : orangeColor}`,
 background: "none",
 color: grayColor,
 '&::placeholder': {
 color: '#666',
 },
 }
 }}
 />
<PasswordInput
 placeholder="Re-enter your password"
 required
 value={passwordCofirm}
error={errors.new_password_confirmation}
onChange={(e) => {
 setPasswordConfirm(e.target.value);
 setErrors(prev => ({ ...prev, new_password_confirmation: undefined }));
 }}
 mb="32px"
 styles={{
 label: { color: grayColor },
 input: {
 padding: '22px 24px',
borderRadius: '12px',
 border: `1px solid ${errors.new_password_confirmation ? 'red' : orangeColor}`,
 background: "none",
color: grayColor,
'&::placeholder': {
 color: '#666',
 },
 }
 }}
 />
 </Box>
 <Button w="100%" maw={800} size="lg" bg={whiteColor} radius="10px" mb={"30px"}  onClick={async () => {
 const isValid = validateForm();
 const authToken = localStorage.getItem('authToken');
 if (!authToken) {
        notifications.show({
          title: 'Error',
          message: 'Authentication token not found. Please re-verify your email.',
          color: 'red',
          autoClose: 5000,
        });
        return;
      }
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
 await ResetPasswordMutation({ new_password: password, new_password_confirmation: passwordCofirm, token: authToken }); 
 setPassword("");
 setPasswordConfirm("");
 localStorage.removeItem('authToken');
} catch (e) {
console.error("Mutation failed:", e); 
 }
 finally {
 setLoading(false);
 }
}}>
 <Text c={darkBlueColor} fw={600} size="16px">Save password</Text>
</Button>
 </Flex>
 );
}