import { Box, Button, Flex, Text, useMantineTheme } from "@mantine/core";
import imgWork1 from "../assets/Work1.svg";
import imgWork2 from "../assets/Work2.svg";
import imgWork3 from "../assets/Work3.svg";
import CAT from "../assets/CTA.png";
import imgHowWork from "../assets/howWork.png";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
export default function HowItWorks() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const left = isMobile ? "50%" : "15.5%";
  const transform = isMobile ? "translate(-50%, -50%)" : "translateY(-50%)";
  const getStarted = () => {
    return navigate("/register");
  };
  return (
    <>
      <Flex
        bg={"#F8F9FB"}
        direction={"column"}
        py={"50px"}
        justify={"center"}
        align={"center"}
      >
        <Text
          className="font-adlam"
          c={"#2C3131"}
          fz={isMobile ? "32px" : "48px"}
          fw={"400"}
          style={{ lineHeight: "125%", textAlign: "center" }}
          w={isMobile ? "327px" : "515px"}
        >
          {t("Get Started in Just Few Minute")}
        </Text>
        <Text
          c={"#626262"}
          fz={"18px"}
          fw={"400"}
          style={{ lineHeight: "145%" }}
          mt={"37px"}
          w={isMobile ? "327px" : "100%"}
          ta={isMobile ? "center" : "center"}
        >
          {t(
            "Has a variety of features that make it the best place to start trading"
          )}
        </Text>
        <Flex
          justify={"space-between"}
          align={"center"}
          mt={"50px"}
          gap={"30px"}
          w={isMobile ? "100%" : "1300px"}
          direction={isMobile ? "column" : undefined}
          px={isMobile ? "xl" : "0"}
        >
          <Box
            bg={"#fff"}
            style={{
              borderRadius: "20px",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
            }}
            display={"flex"}
            w={isMobile ? "100%" : "383px"}
            pt={"40px"}
            pb={"63.6px"}
            px={"10px"}
            h={"414px"}
          >
            <img src={imgWork1} alt="img-work" />
            <Text
              className="font-adlam"
              c={"#0A1F44"}
              fz={"24px"}
              fw={"400"}
              style={{ lineHeight: "125%" }}
            >
              {t("Sign Up")}
            </Text>
            <Text
              c={"#626262"}
              fz={isMobile ? "15px" : "16px"}
              fw={"400"}
              style={{ lineHeight: "150%", textAlign: "center" }}
              w={isMobile ? "100%" : "335px"}
              mt={"16px"}
            >
              {t(
                "Create your account, purchase Bitcoin or Gold, and keep them safe in your wallet"
              )}
            </Text>
          </Box>
          <Box
            bg={"#fff"}
            style={{
              borderRadius: "20px",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
            }}
            display={"flex"}
            w={isMobile ? "100%" : "383px"}
            pt={"40px"}
            pb={"63.6px"}
            px={"10px"}
            h={"414px"}
          >
            <img src={imgWork2} alt="img-work" />
            <Text
              className="font-adlam"
              c={"#0A1F44"}
              fz={"24px"}
              fw={"400"}
              style={{ lineHeight: "125%" }}
            >
              {t("Fund")}
            </Text>
            <Text
              c={"#626262"}
              fz={isMobile ? "15px" : "16px"}
              fw={"400"}
              style={{ lineHeight: "150%" }}
              ta={isMobile ? "center" : "start"}
              w={isMobile ? "100%" : "335px"}
              mt={"16px"}
            >
              {t(
                "Choose the market you want to explore, such as stocks, commodities, or cryptocurrencies,to start trading on our platform."
              )}
            </Text>
          </Box>
          <Box
            bg={"#fff"}
            style={{
              borderRadius: "20px",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
            }}
            display={"flex"}
            w={isMobile ? "100%" : "383px"}
            pt={"40px"}
            pb={"63.6px"}
            px={"10px"}
            h={"414px"}
          >
            <img src={imgWork3} alt="img-work" />
            <Text
              className="font-adlam"
              c={"#0A1F44"}
              fz={"24px"}
              fw={"400"}
              style={{ lineHeight: "125%" }}
            >
              {t("Market Insights")}
            </Text>
            <Text
              c={"#626262"}
              fz={isMobile ? "15px" : "16px"}
              fw={"400"}
              style={{ lineHeight: "150%", textAlign: "center" }}
              w={isMobile ? "100%" : "335px"}
              mt={"16px"}
            >
              {t(
                "Sign up for a free web wallet and get access to real-time market analysis and trends to make smarter trading decisions."
              )}
            </Text>
          </Box>
        </Flex>
        <Box mt={"70px"} w={"100%"} style={{ position: "relative" }}>
          <img src={isMobile ? imgHowWork : CAT} alt="cat" width={"100%"} />

          <Button
            w={isMobile ? "85%" : undefined}
            style={{
              alignItems: "center",
              gap: "10px",
              padding: "18px 40px",
              height: "auto",
              border: "2px solid #FF9B42",
              position: "absolute",
              left: left,
              top: "60%",
              transform: transform,
              textAlign: "center",
              justifyContent: "center",
            }}
            fz={"16px"}
            fw={"600"}
            c={"#FF9B42"}
            bg={"#0A1F44"}
            radius={"10px"}
            display={"flex"}
            onClick={getStarted}
          >
            {t("Get started")}
          </Button>
        </Box>
      </Flex>
    </>
  );
}
