import { Box, Flex, Text, Title, Anchor, Divider, rem } from "@mantine/core";
import { useState } from "react";
import logo from "../assets/ADXLOGO.png";
import FormInfo from "../components/FormInfo";
import VerifyCodeForm from "../components/VerifyCodeForm";
import iconArrow from "../assets/back-icon.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function Register() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [activeStep, setActiveStep] = useState(1);
  const orangeColor = "#FF9B42";
  const grayColor = "#CFCFCF";
  const whiteColor = "#F8F9FB";
  const navigate = useNavigate();
  const getStepColor = (stepNumber: number) => {
    return stepNumber <= activeStep ? orangeColor : grayColor;
  };

  const handleNextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };
  const handleBackClick = () => {
    navigate("/");
  };
  const getLogin = () => {
    navigate("/login");
  };
  const renderCurrentStepComponent = () => {
    switch (activeStep) {
      case 1:
        return <FormInfo onNextStep={handleNextStep} />;
      case 2:
        return <VerifyCodeForm />;
      default:
        return <FormInfo onNextStep={handleNextStep} />;
    }
  };
  const responsiveTextWidth = {
    base: rem(70),
    sm: rem(90),
    md: rem(100),
    lg: rem(200),
  };
  const responsiveFontSize = {
    base: rem(10),
    sm: rem(14),
    md: rem(16),
  };

  return (
    <Flex
      direction="column"
      align="center"
      bg={"#0A1F44"}
      justify="flex-start"
      h="100%"
      mb={{ base: "0px", sm: "0px" }}
      style={{ padding: "0px 20px 20px 20px" }}
    >
      <Flex align="center" justify={"space-between"} w={"100%"} mb={"30px"}>
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
        fz={{ base: rem(28), sm: rem(32) }}
      >
        {t("Create an account")}
      </Title>
      <Text fz={{ base: "14px", sm: "16px" }} c={grayColor} mb="xl" fw={400}>
        {t("Already have an account?")}{" "}
        <Anchor
          c={orangeColor}
          fz={{ base: "14px", sm: "16px" }}
          td="underline"
          onClick={getLogin}
        >
          {t("Login")}
        </Anchor>
      </Text>
      <Flex
        mb="30px"
        justify="space-between"
        align="flex-start"
        w="100%"
        maw={{ base: "350px", sm: "600px", md: "700px" }}
      >
        <Flex
          direction="column"
          align="center"
          gap="8px"
          style={{ flexGrow: 0 }}
        >
          <Flex
            w={20}
            h={20}
            align="center"
            justify="center"
            bg={getStepColor(1)}
            style={{ borderRadius: "50%" }}
          >
            <Text size="12px" fw={500} style={{ cursor: "pointer" }}>
              1
            </Text>
          </Flex>
          <Text
            fz={responsiveFontSize}
            c={"#CFCFCF"}
            fw={300}
            ta="center"
            w={responsiveTextWidth}
          >
            {t("Enter your info")}
          </Text>
        </Flex>
        <Box w={{ base: rem(70), sm: rem(140) }} mt={rem(10)}>
          <Divider color={grayColor} orientation="horizontal" />
        </Box>
        <Flex
          direction="column"
          align="center"
          gap="8px"
          style={{ flexGrow: 0 }}
        >
          <Flex
            w={20}
            h={20}
            align="center"
            justify="center"
            bg={getStepColor(2)}
            style={{ borderRadius: "50%" }}
          >
            <Text size="12px" fw={500} style={{ cursor: "pointer" }}>
              2
            </Text>
          </Flex>
          <Text
            c={"#CFCFCF"}
            fz={responsiveFontSize}
            fw={300}
            ta="center"
            w={responsiveTextWidth}
          >
            {t("Provide your verify code")}
          </Text>
        </Flex>
      </Flex>
      {renderCurrentStepComponent()}
    </Flex>
  );
}
