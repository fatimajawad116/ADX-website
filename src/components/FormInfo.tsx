import {
  Anchor,
  Box,
  Button,
  PasswordInput,
  rem,
  Text,
  TextInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useLoadingStore from "../store/useLoader";
import { useTranslation } from "react-i18next";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const REGESTER_ENDPOINT = "/register";
const REGESTER_URL = `${
  BASE_URL.endsWith("/api") ? BASE_URL : BASE_URL + "/api"
}${REGESTER_ENDPOINT}`;
interface FormInputProps {
  onNextStep: () => void;
}
type FormInfoType = {
  full_name: string;
  email: string;
  password: string;
  phone: string;
};
async function RegisterUser({
  full_name,
  email,
  password,
  phone,
}: FormInfoType) {
  if (!BASE_URL) {
    throw new Error(
      "VITE_BACKEND_URL is not defined in environment variables."
    );
  }
  const response = await fetch(REGESTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ full_name, email, password, phone }),
  });
  console.log(response);
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "unknown error" }));
    const errorMessage =
      errorData.message ||
      errorData.error ||
      `Register failed with status: ${response.status}`;
    throw new Error(errorMessage);
  }
  return response.json();
}
type FormInfoError = {
  full_name?: string;
  email?: string;
  password?: string;
  phone?: string;
};
export default function FormInfo({ onNextStep }: FormInputProps) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { setLoading } = useLoadingStore();
  const [full_name, setFull_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormInfoError>({});
  const orangeColor = "#FF9B42";
  const grayColor = "#CFCFCF";
  const darkBlueColor = "#0A1F44";
  const whiteColor = "#F8F9FB";
  const responsiveFontSize = {
    base: rem(12),
    sm: rem(14),
    md: rem(16),
  };
  const responsiveTextWidth = {
    base: rem(260),
    md: rem(100),
    lg: rem(1000),
  };
  localStorage.setItem("userEmailForVerification", email);
  const { mutateAsync: RegisterUserMutation } = useMutation({
    mutationFn: RegisterUser,
    onSuccess: (data) => {
      console.log("Register One Step Successfull Data : ", data);
      notifications.show({
        title: "One Step Successfull !",
        message: "Send Message verify code for your Gmail",
        color: "green",
        autoClose: 5000,
      });
      queryClient.invalidateQueries({ queryKey: ["registerUser"] });
      onNextStep();
    },
    onError: (error) => {
      console.error("Register Error : ", error.message);
      notifications.show({
        title: "Register Failed",
        message: error.message,
        color: "red",
        autoClose: 5000,
      });
    },
  });

  const validateForm = () => {
    const newErrors: FormInfoError = {};
    if (!full_name.trim()) {
      newErrors.full_name = "Full Name is required.";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be 6 or more characters.";
    }
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{7,15}$/.test(phone.trim())) {
      newErrors.phone = "Invalid phone number format.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return (
    <>
      <Box w="100%" maw={800} mb="xl">
        <TextInput
          label={t("What’s your full name?")}
          placeholder={t("Enter your full name")}
          required
          value={full_name}
          error={errors.full_name}
          onChange={(e) => {
            setFull_name(e.target.value);
            setErrors((prev) => ({ ...prev, full_name: undefined }));
          }}
          mb="32px"
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
          mb="32px"
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
        <TextInput
          label={t("What’s your phone number?")}
          placeholder={t("Enter your phone number")}
          required
          value={phone}
          error={errors.phone}
          onChange={(e) => {
            setPhone(e.target.value);
            setErrors((prev) => ({ ...prev, phone: undefined }));
          }}
          mb="32px"
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
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => ({ ...prev, password: undefined }));
          }}
          error={errors.password}
          mb="70px"
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
        />
        <Text
          w={responsiveTextWidth}
          fz={responsiveFontSize}
          c="#666"
          fw={400}
          mb="30px"
        >
          {t("By creating an account, you agree to our")}{" "}
          <Anchor
            href="#"
            c={orangeColor}
            td="underline"
            fz={responsiveFontSize}
          >
            {t("Terms of use")}
          </Anchor>{" "}
          {t("and")}{" "}
          <Anchor
            href="#"
            c={orangeColor}
            td="underline"
            fz={responsiveFontSize}
          >
            {t("Privacy Policy")}
          </Anchor>
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
            await RegisterUserMutation({ full_name, email, password, phone });
          } catch (error) {
            console.error("Mutation failed:", error);
          } finally {
            setLoading(false);
          }
        }}
      >
        <Text c={darkBlueColor} fw={600} size="16px">
          {t("Continue")}
        </Text>
      </Button>
    </>
  );
}
