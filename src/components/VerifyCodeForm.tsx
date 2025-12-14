import { Anchor, Box, Button, rem, Text, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import useLoadingStore from "../store/useLoader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const VERIFY_ENDPOINT = "/verify-email";
const VERIFY_URL = `${
  BASE_URL.endsWith("/api") ? BASE_URL : BASE_URL + "/api"
}${VERIFY_ENDPOINT}`;

type VerifyCodePayload = {
  code: string;
  email: string;
};

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
  base: rem(320),
  sm: rem(90),
  md: rem(1000),
  lg: rem(1000),
};

async function VerifyCode({ code, email }: VerifyCodePayload) {
  if (!BASE_URL) {
    throw new Error(
      "VITE_BACKEND_URL is not defined in environment variables."
    );
  }

  const response = await fetch(VERIFY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, email }),
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Verification failed" }));
    throw new Error(
      errorData.message || `Verify failed with status: ${response.status}`
    );
  }
  return response.json();
}

type VerifyCodeError = {
  code?: string;
};

export default function VerifyCodeForm() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [verifyCode, setVerifyCode] = useState("");
  const [errors, setErrors] = useState<VerifyCodeError>({});
  const navigate = useNavigate();
  const { setLoading } = useLoadingStore();
  const validateForm = () => {
    const newErrors: VerifyCodeError = {};
    if (!verifyCode.trim()) {
      newErrors.code = "Verification code is required.";
    } else if (!/^\d{6}$/.test(verifyCode.trim())) {
      newErrors.code = "Invalid code format. The code must be 6 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { mutateAsync: VerifyCodeMutation } = useMutation({
    mutationFn: VerifyCode,

    onSuccess: (data) => {
      console.log("Verify successful! Data:", data);
      notifications.show({
        title: "Verification Successful!",
        message: "Your email has been successfully verified.",
        color: "green",
        autoClose: 5000,
      });
      queryClient.invalidateQueries({ queryKey: ["registerUser"] });
      setTimeout(() => navigate("/mainPage"), 500);
      localStorage.removeItem("userEmailForVerification");
    },

    onError: (error) => {
      console.error("Verification Error:", error.message);
      notifications.show({
        title: "Verification Failed",
        message: error.message,
        color: "red",
        autoClose: 5000,
      });
    },
  });
  const storedEmail = localStorage.getItem("userEmailForVerification");
  return (
    <>
      <Box w="100%" maw={800} mb="xl">
        <Text
          fz={responsiveFontSize}
          c={whiteColor}
          fw={400}
          mt="70px"
          w={responsiveTextWidth}
          mb={"10px"}
        >
          {t("We’ve sent a verification code to your email.")}
        </Text>
        <Text
          fz={responsiveFontSize}
          c={whiteColor}
          fw={400}
          w={responsiveTextWidth}
          mb={"70px"}
        >
          {t(
            "Please check your inbox and enter the code below to complete the verification."
          )}
        </Text>
        <TextInput
          placeholder={t("Enter your verification code")}
          required
          error={errors.code}
          value={verifyCode}
          onChange={(e) => {
            setVerifyCode(e.target.value);
            setErrors((prev) => ({ ...prev, code: undefined }));
          }}
          mb="32px"
          styles={{
            label: { color: grayColor },
            input: {
              padding: "22px 12px",
              borderRadius: "12px",
              border: `1px solid ${errors.code ? "red" : orangeColor}`,
              background: "none",
              color: grayColor,
              "&::placeholder": {
                color: "#666",
              },
            },
          }}
        />
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
                "Please review and correct the field highlighted in red.",
              color: "yellow",
              autoClose: 5000,
            });
            return;
          }
          if (!storedEmail) {
            notifications.show({
              title: "Error",
              message: "Email not found. Please go back and re-register.",
              color: "red",
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
          } finally {
            setLoading(false);
          }
        }}
      >
        <Text c={darkBlueColor} fw={600} size="16px">
          {t("Verify")}
        </Text>
      </Button>

      <Text fz={responsiveFontSize} c={whiteColor} fw={400} mb="30px">
        {t("Didn’t get the code?")}{" "}
        <Anchor href="#" c={whiteColor} fw={"600"} fz={responsiveFontSize}>
          {t("Resend")}
        </Anchor>
      </Text>
    </>
  );
}
