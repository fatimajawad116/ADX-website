import {
  Box,
  Flex,
  Text,
  Title,
  Anchor,
  Button,
  PasswordInput,
  TextInput,
  rem,
} from "@mantine/core";
import logo from "../assets/ADXLOGO.png";
import iconArrow from "../assets/back-icon.svg";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import useLoadingStore from "../store/useLoader";
import { useTranslation } from "react-i18next";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const LOGIN_ENDPOINT = "/login";
const LOGIN_URL = `${
  BASE_URL.endsWith("/api") ? BASE_URL : BASE_URL + "/api"
}${LOGIN_ENDPOINT}`;
type LoginCredentials = {
  email: string;
  password: string;
};
type LoginResponse = {
  message: string;
  access_token: string;
};
async function loginUser({
  email,
  password,
}: LoginCredentials): Promise<LoginResponse> {
  if (!BASE_URL) {
    throw new Error(
      "VITE_BACKEND_URL is not defined in environment variables."
    );
  }

  const response = await fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Login failed" }));
    throw new Error(
      errorData.message || `Login failed with status: ${response.status}`
    );
  }
  return response.json() as Promise<LoginResponse>;
}

type LoginErrors = {
  email?: string;
  password?: string;
};

export default function Login() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const orangeColor = "#FF9B42";
  const grayColor = "#CFCFCF";
  const whiteColor = "#F8F9FB";
  const darkBlueColor = "#0A1F44";
  const navigate = useNavigate();
  const { setLoading } = useLoadingStore();

  const validateForm = () => {
    const newErrors: LoginErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Use 6 or more characters, numbers, symbols";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleBackClick = () => {
    navigate("/");
  };

  const { mutateAsync: loginUserMutation } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data: LoginResponse) => {
      console.log("Login successful! Data:", data);

      if (data.access_token) {
        localStorage.setItem("authToken", data.access_token);
        console.log("Token saved to localStorage.");
      } else {
        console.warn(
          "Login successful, but no token was returned in the response."
        );
      }
      notifications.show({
        title: "Login Successful!",
        message: "You have been successfully logged in to your account.",
        color: "green",
        autoClose: 5000,
      });

      queryClient.invalidateQueries({ queryKey: ["loginUser"] });
      setTimeout(() => navigate("/mainPage"), 500);
    },
    onError: (error) => {
      console.error("Login Error:", error.message);
      notifications.show({
        title: "Login Failed",
        message: error.message,
        color: "red",
        autoClose: 5000,
      });
    },
  });
  const handlefogotPassowrd = () => {
    return navigate("/forgotpassword");
  };
  return (
    <Flex
      direction="column"
      bg={"#0A1F44"}
      align="center"
      h="100vh"
      style={{ padding: "0 20px" }}
    >
      <Flex align="center" justify={"space-between"} w={"100%"} mb={"70px"}>
        <Box>
          <img
            src={iconArrow}
            alt="icon-arrow"
            onClick={handleBackClick}
            style={{
              cursor: "pointer",
              transform: isArabic ? "scaleX(-1)" : "scaleX(1)",
            }}
          />
        </Box>
        <Box w={{ base: rem(99), sm: rem(150) }}>
          <img
            src={logo}
            alt="ADX logo"
            width={150}
            height={53}
            style={{ display: "block", maxWidth: "100%", height: "auto" }}
          />
        </Box>
        <Box display={{ base: "none", sm: "block" }}></Box>
      </Flex>
      <Title
        order={1}
        mb="xs"
        c={whiteColor}
        fw={"500"}
        fz={{ base: rem(22), sm: rem(32) }}
      >
        {t("Login to your account")}
      </Title>
      <Text
        fz={{ base: rem(16), sm: rem(16) }}
        c={grayColor}
        mb="50px"
        fw={400}
      >
        {t("Do not have an account account?")}
        <Anchor
          href="/register"
          c={orangeColor}
          fz={{ base: rem(16), sm: rem(16) }}
          td="underline"
        >
          {t("Sign Up")}
        </Anchor>
      </Text>
      <Box w="100%" maw={800} mb="70px">
        <TextInput
          label={t("What's your email?")}
          placeholder={t("Enter your email address")}
          required
          value={email}
          error={errors.email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          mb="40px"
          styles={{
            label: { color: grayColor, marginBottom: "10px" },
            input: {
              padding: "22px 12px",
              borderRadius: "12px",
              border: `1px solid ${errors.email ? "red" : orangeColor}`,
              background: "none",
              color: grayColor,
              "&::placeholder": {
                color: "#666",
              },
            },
          }}
        />
        <PasswordInput
          label={t("What's your password?")}
          placeholder={t("Enter your password")}
          required
          value={password}
          error={errors.password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => ({ ...prev, password: undefined }));
          }}
          styles={{
            label: { color: grayColor, marginBottom: "10px" },
            input: {
              padding: "22px 24px",
              borderRadius: "12px",
              border: `1px solid ${errors.password ? "red" : orangeColor}`,
              background: "none",
              color: grayColor,
              "&::placeholder": {
                color: "#666",
              },
            },
          }}
          mb={"17.5px"}
        />
        <Text
          style={{
            display: "flex",
            justifyContent: "flex-end",
            cursor: "pointer",
          }}
          c={"#666"}
          size={"13px"}
          fw={"400"}
          onClick={handlefogotPassowrd}
        >
          {t("Forgot your password?")}
        </Text>
      </Box>

      <Button
        w="100%"
        maw={800}
        size="lg"
        bg={whiteColor}
        radius="10px"
        mb={"30px"}
        onClick={async () => {
          const isValid = validateForm();
          if (!isValid) {
            notifications.show({
              title: "Input error",
              message:
                "Please review and correct the fields highlighted in red.",
              color: "yellow",
              autoClose: 5000,
            });
            return;
          }
          setLoading(true);
          try {
            await loginUserMutation({ email, password });
            setEmail("");
            setPassword("");
          } catch (e) {
            console.error(e);
          } finally {
            setLoading(false);
          }
        }}
      >
        <Text c={darkBlueColor} fw={600} size="16px">
          {t("Login")}
        </Text>
      </Button>
    </Flex>
  );
}
