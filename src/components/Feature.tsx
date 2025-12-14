import { Box, Flex, Text, useMantineTheme } from "@mantine/core";
import imgFuture from "../assets/imgFeature.svg";
import imgFuture2 from "../assets/imgFeature2.svg";
import imgFuture3 from "../assets/imgFeature3.svg";
import { useMediaQuery } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
export default function Feature() {
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const strokeColor = isMobile ? "var(--Primary-60, #FF9B42)" : undefined;
  const strokeWidth = isMobile ? "1px" : undefined;
  return (
    <>
      <Flex
        bg={"#0A1F44"}
        direction={"column"}
        align={"flex-start"}
        mt={"50px"}
        mb={"50px"}
        pt={"96px"}
        pb={"177px"}
      >
        <Flex
          justify={"space-between"}
          w={"100%"}
          mb={"80px"}
          direction={isMobile ? "column-reverse" : undefined}
          px={isMobile ? "50px" : "120px"}
        >
          <Box
            bg={"#E8FAFE"}
            w={isMobile ? "273px" : "491px"}
            pt={"50px"}
            style={{
              borderRadius: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            mt={isMobile ? "56px" : undefined}
          >
            <img src={imgFuture} alt="imgFuture" width={"100%"} />
          </Box>
          <Box w={isMobile ? "100%" : "50%"}>
            <Text
              c={"#fff"}
              fz={isMobile ? "32px" : "48px"}
              fw={"400"}
              style={{ lineHeight: "125%" }}
              className="font-adlam"
            >
              {t("What we provide you !")}
            </Text>
            <Text
              c={"#F8F9FB"}
              fz={isMobile ? "32px" : "48px"}
              ta={isMobile ? "center" : "start"}
              fw={"400"}
              style={{
                lineHeight: "125%",
                WebkitTextStrokeWidth: strokeWidth,
                WebkitTextStrokeColor: strokeColor,
              }}
              className="font-adlam"
              mt={"48px"}
            >
              {t("Create portfolio today")}
            </Text>
            <Text
              c={"#CFCFCF"}
              fz={"18px"}
              fw={"400"}
              pr={isMobile ? "66px" : undefined}
              ta={isMobile ? "center" : "start"}
              style={{ lineHeight: "145%" }}
              mt={"16px"}
              w={isMobile ? "327px" : "540px"}
            >
              {t(
                "Buy and sell popular digital currencies, keep track of them in the one place. Has a variety of features that make it the best place to start trading."
              )}
            </Text>
          </Box>
        </Flex>
        <Flex
          justify={"space-between"}
          w={"100%"}
          mt={isMobile ? "20px" : "80px"}
          align={"center"}
          direction={isMobile ? "column" : undefined}
          px={isMobile ? "20px" : "120px"}
        >
          <Box w={isMobile ? "100%" : "50%"}>
            <Text
              c={"#fff"}
              fz={isMobile ? "32px" : "48px"}
              ta={isMobile ? "center" : "start"}
              fw={"400"}
              style={{
                lineHeight: "125%",
                WebkitTextStrokeWidth: strokeWidth,
                WebkitTextStrokeColor: strokeColor,
              }}
              className="font-adlam"
            >
              {t("Lightning-Fast Crypto Trading")}
            </Text>
            <Text
              c={"#CFCFCF"}
              fz={"18px"}
              fw={"400"}
              style={{ lineHeight: "145%" }}
              mt={"16px"}
              w={isMobile ? "100%" : "540px"}
            >
              {t(
                "Invest in global stocks, commodities like gold and oil, and popular cryptocurrencies — all in one place. Enjoy a seamless trading experience with continuous support and professional tools to help you make confident decisions."
              )}
            </Text>
          </Box>
          <Box
            bg={"#E8FAFE"}
            w={isMobile ? "273px" : "491px"}
            pt={"50px"}
            mt={isMobile ? "50px" : undefined}
            style={{
              borderRadius: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={imgFuture2} alt="imgFuture2" width={"100%"} />
          </Box>
        </Flex>
        <Flex
          justify={"space-between"}
          w={"100%"}
          mt={isMobile ? "20px" : "80px"}
          align={"center"}
          direction={isMobile ? "column-reverse" : undefined}
          px={isMobile ? "20px" : "120px"}
        >
          <Box
            bg={"#E8FAFE"}
            w={isMobile ? "273px" : "491px"}
            pt={"50px"}
            style={{
              borderRadius: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={imgFuture3} alt="imgFuture2" width={"100%"} />
          </Box>
          <Box
            w={isMobile ? "100%" : "50%"}
            mt={isMobile ? "30px" : undefined}
            mb={isMobile ? "50px" : undefined}
          >
            <Text
              c={"#fff"}
              fz={isMobile ? "32px" : "48px"}
              ta={isMobile ? "center" : "start"}
              fw={"400"}
              style={{
                lineHeight: "125%",
                WebkitTextStrokeWidth: strokeWidth,
                WebkitTextStrokeColor: strokeColor,
              }}
              className="font-adlam"
            >
              {t("Security From Day One")}
            </Text>
            <Text
              c={"#CFCFCF"}
              fz={"18px"}
              fw={"400"}
              style={{ lineHeight: "145%" }}
              mt={"16px"}
              w={isMobile ? "100%" : "540px"}
            >
              {t(
                "Safety, security and compliance. Buy and sell popular digital currencies, keep track of them in the one place."
              )}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
