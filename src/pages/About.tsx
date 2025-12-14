import { Flex, Text, useMantineTheme } from "@mantine/core";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useMediaQuery } from "@mantine/hooks";
import { useTranslation } from "react-i18next";

export default function About() {
  const theme = useMantineTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  return (
    <>
      <Header />
      <Flex
        direction={"column"}
        py={isMobile ? "50px" : "100px"}
        px={isMobile ? "20px" : "100px"}
        bg={"#F8F8FC"}
        gap={"20px"}
        justify={isMobile ? "center" : undefined}
      >
        <Text
          c={"#0A1F44"}
          style={{ lineHeight: "150%" }}
          fz={isMobile ? "36px" : "96px"}
          fw={"400"}
        >
          {t("Welcome to")} ADX
        </Text>
        <Text
          c={"#FF9B42"}
          style={{ lineHeight: "150%" }}
          fz={isMobile ? "20px" : "36px"}
          fw={"500"}
          w={isMobile ? "90%" : undefined}
        >
          {t("your gateway to smarter, more professional trading")}
        </Text>
        <Flex direction={"column"} w={isMobile ? "317px" : undefined}>
          <Text
            c={"#0A1F44"}
            style={{ lineHeight: "150%" }}
            fz={isMobile ? "14px" : "24px"}
            fw={"500"}
            w={isMobile ? "100%" : "1099px"}
          >
            {t(
              "At ADX, we believe trading should be accessible, transparent, and driven by knowledge. Our platform is designed to empower traders of all levels with the tools, insights, and resources they need to succeed in today’s dynamic financial markets ."
            )}
          </Text>
          <Text
            c={"#0A1F44"}
            style={{ lineHeight: "150%" }}
            fz={isMobile ? "14px" : "24px"}
            fw={"500"}
            w={isMobile ? "100%" : "1170px"}
          >
            {t(
              "Whether you’re exploring stocks, commodities, or cryptocurrencies, ADX provides real-time data, advanced charting tools, and a seamless trading experience that puts you in control. We combine cutting-edge technology with a user-friendly interface to ensure your journey from learning to executing trades is smooth and rewarding."
            )}
          </Text>
          <Text
            c={"#0A1F44"}
            style={{ lineHeight: "150%" }}
            fz={isMobile ? "14px" : "24px"}
            fw={"500"}
            w={isMobile ? "100%" : "1110px"}
          >
            {t(
              "Our mission is simple: to help you trade with confidence, backed by reliable information and"
            )}{" "}
          </Text>
          <Text
            c={"#0A1F44"}
            style={{ lineHeight: "150%" }}
            fz={isMobile ? "14px" : "24px"}
            fw={"500"}
            w={isMobile ? "100%" : "1149px"}
          >
            {t(
              "professional-grade features. With ADX, you don’t just trade — you grow, adapt, and stay ahead of the market."
            )}
          </Text>
        </Flex>
      </Flex>
      <Footer />
    </>
  );
}
