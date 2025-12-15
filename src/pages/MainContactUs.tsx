import {
  Anchor,
  Box,
  Center,
  Flex,
  Loader,
  Text,
  useMantineTheme,
} from "@mantine/core";
import Footer from "../components/Footer";
import imgIcon from "../assets/icon-whatsapp.svg";
import { useMediaQuery } from "@mantine/hooks";
import HeaderMain from "../components/HeaderMain";
import Header from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const CONTACTUS_ENDPOINT = "/contact-us";
const CONTACTUS_URL = `${
  BASE_URL.endsWith("/api") ? BASE_URL : BASE_URL + "/api"
}${CONTACTUS_ENDPOINT}`;
interface ContactUs {
  contact_number: string;
  phrase: string;
  whatsapp_link: string;
}
async function fetchContactUs(): Promise<ContactUs> {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    throw new Error("Authentication token not found. Please log in.");
  }
  const response = await fetch(CONTACTUS_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Failed to fetch contactUs" }));
    throw new Error(
      errorData.message ||
        `Failed to fetch contactUs with status: ${response.status}`
    );
  }
  const data = await response.json();
  return data.data;
}
const formateContactUs = (contact: ContactUs) => {
  return {
    contact_number: contact.contact_number || "",
    phrase: contact.phrase || "",
    whatsapp_link: contact.whatsapp_link || "",
  };
};
export default function MainContactUs() {
  const {
    data: contactUsData,
    isLoading,
    error,
  } = useQuery<ContactUs, Error>({
    queryKey: ["ContactUsData"],
    queryFn: fetchContactUs,
  });
  const theme = useMantineTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const formattedData = contactUsData ? formateContactUs(contactUsData) : null;

  if (isLoading) {
    return (
      <Box>
        <HeaderMain />
        <Center h="70vh">
          <Loader size="xl" color="#FF9B42" />
        </Center>
        <Footer />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <HeaderMain />
        <Center h="70vh">
          <Text c="red" size="lg">
            Error: {error.message}
          </Text>
        </Center>
        <Footer />
      </Box>
    );
  }
  if (!formattedData) {
    return (
      <Box>
        <Header />
        <Center h="70vh">
          <Text size="lg">{t("Contact details are not available.")}</Text>
        </Center>
        <Footer />
      </Box>
    );
  }
  return (
    <>
      <HeaderMain />
      <Flex
        direction={"column"}
        py={"50px"}
        px={isMobile ? "30px" : "100px"}
        bg={"#F8F8FC"}
        gap={"20px"}
      >
        <Text
          c={"#0A1F44"}
          style={{ lineHeight: "150%" }}
          fz={isMobile ? "36px" : "96px"}
          fw={"400"}
        >
          {t("Contact Us")}
        </Text>
        <Flex direction={"column"}>
          <Text
            c={"#0A1F44"}
            style={{ lineHeight: "150%" }}
            fz={isMobile ? "16px" : "24px"}
            fw={"500"}
            w={isMobile ? "100%" : "1099px"}
          >
            {formattedData.phrase}
          </Text>
        </Flex>
        <Flex
          mt={"20px"}
          justify={"space-between"}
          w={"50%"}
          direction={isMobile ? "column" : undefined}
          gap={isMobile ? "20px" : undefined}
        >
          <Flex align={"center"} gap={"10px"}>
            <img
              src={imgIcon}
              alt="icon-img"
              width={isMobile ? "42px" : "84px"}
            />
            <Text
              c="#0A1F44"
              fz={isMobile ? "16px" : "24px"}
              fw={"500"}
              style={{ lineHeight: "150%" }}
            >
              {formattedData.contact_number}
            </Text>
          </Flex>
          <Anchor
            href={formattedData.whatsapp_link}
            target="_blank"
            underline="never"
          >
            <Flex
              w={"251px"}
              style={{
                border: "1px solid #FF9B42",
                borderRadius: "12px",
                cursor: "pointer",
              }}
              align={"center"}
              gap={"20px"}
              p={"10px"}
            >
              <img
                src={imgIcon}
                alt="icon-img"
                width={isMobile ? "34px" : "63px"}
              />
              <Text
                c="#0A1F44"
                fz={isMobile ? "16px" : "24px"}
                fw={"500"}
                style={{ lineHeight: "150%" }}
              >
                {t("Direct Link")}
              </Text>
            </Flex>
          </Anchor>
        </Flex>
      </Flex>
      <Footer />
    </>
  );
}
