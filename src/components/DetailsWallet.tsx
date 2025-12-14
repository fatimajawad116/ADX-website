import { Center, Flex, Loader, Text, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const TRANSACTIONS_ENDPOINT = "/wallet/overview";
const TRANSACTIONS_URL = `${
  BASE_URL.endsWith("/api") ? BASE_URL : BASE_URL + "/api"
}${TRANSACTIONS_ENDPOINT}`;

interface DetailsWallet {
  balance: string;
  equity: string;
  margin: string;
  free_margin: string;
  margin_level: string;
  p_l: string;
  profit: string;
}

async function fetchDetailsWallett(): Promise<DetailsWallet> {
  // تم تغيير نوع الإرجاع إلى كائن واحد (DetailsWallet)
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    throw new Error("Authentication token not found. Please log in.");
  }
  const response = await fetch(TRANSACTIONS_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Failed to fetch Transactions" }));
    throw new Error(
      errorData.message ||
        `Failed to fetch Stats with Status: ${response.status}`
    );
  }
  const data = await response.json();
  return data.stats;
}
export default function DetailsWallet() {
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const {
    data: walletData,
    isLoading,
    error,
  } = useQuery<DetailsWallet, Error>({
    queryKey: ["detailesData"],
    queryFn: fetchDetailsWallett,
  });
  if (isLoading) {
    return (
      <Center h="70vh">
        <Loader color="#FF9B42" size="xl" />
      </Center>
    );
  }
  if (error) {
    return (
      <Center h="70vh">
        <Text c={"red"} size="lg">
          {t("Error fetching Stats:")} {error.message}
        </Text>
      </Center>
    );
  }
  if (!walletData) {
    return (
      <Center h="70vh">
        <Text c={"gray"} size="lg">
          {t("No wallet data available.")}
        </Text>
      </Center>
    );
  }
  return (
    <Flex mx={"40px"} justify={"center"}>
      <Flex
        w={"100%"}
        px={isMobile ? "20px" : "50px"}
        bg={"#0A1F44"}
        style={{ borderRadius: "20px" }}
        justify={"space-between"}
        gap={"20px"}
        h={isMobile ? "100%" : "182px"}
        py={"20px"}
        direction={isMobile ? "column" : "row"}
      >
        <Flex direction={"column"} gap={"20px"} justify={"center"}>
          <Flex
            justify={isMobile ? "space-between" : "normal"}
            align={"center"}
          >
            <Text
              fw={"600"}
              fz={isMobile ? "18px" : "24px"}
              style={{ fontFamily: "'Inter', sans-serif" }}
              c={"#FFFFFF"}
            >
              {t("P/L")} :
            </Text>
            <Text
              fw={"400"}
              fz={"24px"}
              style={{ fontFamily: "'Inter', sans-serif" }}
              c={"#FFFFFF"}
            >
              {walletData.p_l}
            </Text>
          </Flex>
          <Flex
            justify={isMobile ? "space-between" : "normal"}
            align={"center"}
          >
            <Text
              fw={"600"}
              fz={isMobile ? "18px" : "24px"}
              style={{ fontFamily: "'Inter', sans-serif" }}
              c={"#FFFFFF"}
            >
              {t("Balance")} :
            </Text>
            <Text
              fw={"400"}
              fz={"24px"}
              style={{ fontFamily: "'Inter', sans-serif" }}
              c={"#FFFFFF"}
            >
              {walletData.balance}
            </Text>
          </Flex>
        </Flex>
        <Flex direction={"column"} justify={"center"} gap={"20px"}>
          <Flex
            justify={isMobile ? "space-between" : "normal"}
            align={"center"}
          >
            <Text
              fw={"600"}
              fz={isMobile ? "18px" : "24px"}
              style={{ fontFamily: "'Inter', sans-serif" }}
              c={"#FFFFFF"}
            >
              {t("Credit")} :
            </Text>
            <Text
              fw={"400"}
              fz={"24px"}
              style={{ fontFamily: "'Inter', sans-serif" }}
              c={"#FFFFFF"}
            >
              {walletData.profit}
            </Text>
          </Flex>
          <Flex justify={isMobile ? "space-between" : "normal"}>
            <Text
              fw={"600"}
              fz={isMobile ? "18px" : "24px"}
              style={{ fontFamily: "'Inter', sans-serif" }}
              c={"#FFFFFF"}
            >
              {t("Equity")} :
            </Text>
            <Text
              fw={"400"}
              fz={"24px"}
              style={{ fontFamily: "'Inter', sans-serif" }}
              c={"#FFFFFF"}
            >
              {walletData.equity}
            </Text>
          </Flex>
        </Flex>
        <Flex direction={"column"} justify={"center"} gap={"20px"}>
          <Flex
            justify={isMobile ? "space-between" : "normal"}
            align={"center"}
          >
            <Text
              fw={"600"}
              fz={isMobile ? "18px" : "24px"}
              style={{ fontFamily: "'Inter', sans-serif" }}
              c={"#FFFFFF"}
            >
              {t("Margin")} :
            </Text>
            <Text
              fw={"400"}
              fz={"24px"}
              style={{ fontFamily: "'Inter', sans-serif" }}
              c={"#FFFFFF"}
            >
              {walletData.margin}
            </Text>
          </Flex>
          <Flex
            justify={isMobile ? "space-between" : "normal"}
            align={"center"}
          >
            <Text
              fw={"600"}
              fz={isMobile ? "18px" : "24px"}
              style={{ fontFamily: "'Inter', sans-serif" }}
              c={"#FFFFFF"}
            >
              {t("Free margin")} :
            </Text>
            <Text
              fw={"400"}
              fz={"24px"}
              style={{ fontFamily: "'Inter', sans-serif" }}
              c={"#FFFFFF"}
            >
              {walletData.free_margin}
            </Text>
          </Flex>
        </Flex>
        <Flex direction={"column"} justify={"center"} gap={"20px"}>
          <Flex
            justify={isMobile ? "space-between" : "normal"}
            align={"center"}
          >
            <Text
              fw={"600"}
              fz={isMobile ? "18px" : "24px"}
              style={{ fontFamily: "'Inter', sans-serif" }}
              c={"#FFFFFF"}
            >
              {t("Margin level %")} :
            </Text>
            <Text
              fw={"400"}
              fz={"24px"}
              style={{ fontFamily: "'Inter', sans-serif" }}
              c={"#FFFFFF"}
            >
              {walletData.margin_level}
            </Text>
          </Flex>
          <Flex
            justify={isMobile ? "space-between" : "normal"}
            align={"center"}
          >
            <Text
              fw={"600"}
              fz={isMobile ? "18px" : "24px"}
              style={{ fontFamily: "'Inter', sans-serif" }}
              c={"#FFFFFF"}
            >
              {t("Profit")} :
            </Text>
            <Text
              fw={"400"}
              fz={"24px"}
              style={{ fontFamily: "'Inter', sans-serif" }}
              c={"#FFFFFF"}
            >
              {walletData.profit}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
