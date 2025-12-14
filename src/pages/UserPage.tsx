import { Box, Button, Flex, Text, rem, useMantineTheme } from "@mantine/core";
import Header from "../components/Header";
import imagelanding from "../assets/adx (1) 2.svg";
import imageResponsive from "../assets/adx-responsive.svg";
import BrandCompany from "../components/BrandCompany";
import StatsCard from "../components/StatsCard";
import Feature from "../components/Feature";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
export default function UserPage() {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const getStarted = () => {
    return navigate("/register");
  };
  const isMd = useMediaQuery("(min-width: 768px)");
  const textAlign = isMd ? "center" : "left";
  const isArabic = i18n.language === "ar";
  // const getAlignment = () => {
  //   if (i18n.language === "ar") {
  //     return { base: "center", md: "right" };
  //   }
  //   return { base: "center", md: "left" };
  // };
  return (
    <Flex direction={"column"} bg={"#F8F9FB"} p={0}>
      <Header />
      <Flex justify={"space-between"} align={"center"} wrap="wrap">
        <Box
          w={{ base: "327px", md: "40%" }}
          pr={{ base: 0, md: rem(20) }}
          display={"flex"}
          style={{ flexDirection: "column" }}
          ml={{ base: "20px", md: "100px" }}
          mt={"70px"}
        >
          <Text
            ta={isMobile ? "center" : "start"}
            c={"#FF7A00"}
            fz={{ base: rem(40), md: rem(74) }}
            fw={"400"}
            mb={"xs"}
            style={{
              lineHeight: "125%",
              fontFamily: '"ADLaM Display", system-ui',
              fontStyle: "normal",
            }}
            className="font-adlam"
          >
            {t("One platform")}
          </Text>

          <Text
            ta={isMobile ? "center" : "start"}
            c={"#0A1F44"}
            fz={{ base: rem(36), md: rem(60) }}
            fw={"400"}
            mb={"lg"}
            style={{
              lineHeight: "125%",
              fontFamily: '"ADLaM Display", sans-serif',
              fontStyle: "normal",
            }}
          >
            {t("all things Crypto")}
          </Text>

          <Text
            w={isMobile ? "293px" : undefined}
            c={"#626262"}
            fz={{ base: rem(16), md: rem(20) }}
            fw={"400"}
            mb={"xl"}
            maw={rem(550)}
            ta={textAlign}
          >
            {t(
              "Open a free account in minutes right from your phone and make your money go further"
            )}
          </Text>
        </Box>
        <Box w={{ base: "100%", md: "50%" }} pt={{ base: rem(0), md: 0 }}>
          <img
            src={isMobile ? imageResponsive : imagelanding}
            alt="Crypto Wallet Illustration"
            style={{
              display: "block",
              maxWidth: "100%",
              height: "auto",
              transform: isArabic ? "scaleX(-1)" : "scaleX(1)",
            }}
          />
        </Box>
        <Box
          w={{ base: "100%", md: "40%" }}
          pr={{ base: 0, md: rem(20) }}
          display={"flex"}
          style={{ flexDirection: "column" }}
          ml={{ base: "20px", md: "100px" }}
        >
          <Flex
            align="flex-start"
            gap="md"
            mt={isMobile ? "50px" : "0px"}
            justify={isMobile ? "center" : undefined}
          >
            <Button
              style={{
                alignItems: "center",
                gap: "10px",
                padding: "18px 40px",
                height: "auto",
              }}
              fz={"16px"}
              fw={"600"}
              c={"#fff"}
              bg={"#0A1F44"}
              radius={"10px"}
              display={"flex"}
              onClick={getStarted}
            >
              {t("Get started")}
            </Button>
          </Flex>
        </Box>
      </Flex>
      <BrandCompany />
      <StatsCard />
      <BrandCompany />
      <Feature />
      <HowItWorks />
      <Footer />
    </Flex>
  );
}
