import { Flex, Text, useMantineTheme } from "@mantine/core";
import logo from "../assets/ADXLOGO.png";
import { useMediaQuery } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
export default function Footer() {
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  return (
    <>
      <Flex
        justify={"center"}
        align={"center"}
        w={"100%"}
        bg={"#0A1F44"}
        direction={"column"}
        py={"38px"}
        px={isMobile ? "15px" : "120px"}
        gap={"50px"}
      >
        <Flex direction={"column"} align={"center"} w={"100%"}>
          <Flex>
            <img src={logo} alt="logo-img" width={"206px"} />
          </Flex>
          <Flex>
            <Text
              c={"#fff"}
              fz={"16px"}
              fw={"400"}
              style={{ lineHeight: "150%" }}
            >
              {t("Take your crypto to the next level")}
            </Text>
          </Flex>
        </Flex>
        <Flex
          w={isMobile ? "316px" : "1200.004px"}
          h={"1px"}
          bg={"#FF9B42"}
        ></Flex>
        <Flex>
          <Text
            c={"#fff"}
            fz={isMobile ? "10.7px" : "16px"}
            fw={"400"}
            style={{ lineHeight: "150%" }}
            ta={isMobile ? "center" : undefined}
          >
            {t("© Created with passion — All rights reserved.")}
          </Text>
        </Flex>
      </Flex>
    </>
  );
}
