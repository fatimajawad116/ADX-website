import {
  Box,
  Button,
  Center,
  Flex,
  Loader,
  Table,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import NewRequest from "./NewRequest";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useMemo, useState } from "react";
import CustomPagination from "./Pagination";
import { useTranslation } from "react-i18next";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const TRANSACTIONS_ENDPOINT = "/wallet/overview";
const TRANSACTIONS_URL = `${
  BASE_URL.endsWith("/api") ? BASE_URL : BASE_URL + "/api"
}${TRANSACTIONS_ENDPOINT}`;
interface Transactions {
  type: string;
  currency: string;
  amount: string;
  method: string;
  status: string;
  created_at: string;
}
interface PaginationControl {
  current_page: number;
  setItems_per_page: (value: number) => void;
  setCurrent_page: (page: number) => void;
  total_items: number;
  items_per_page: number;
  total_pages: number;
  setReFetch: (value: boolean) => void;
}
async function fetchTransactions(): Promise<Transactions[]> {
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
        `Failed to fetch Transactions with Status: ${response.status}`
    );
  }
  console.log("responsssss", response);
  // return response.json();
  const data = await response.json();
  return data.transactions_data;
}
const formatTransactionsForTable = (transactions: Transactions) => {
  return {
    type: transactions.type,
    currency: transactions.currency,
    amount: transactions.amount,
    method: transactions.method,
    status: transactions.status,
  };
};
export default function Transactions() {
  const { t, i18n } = useTranslation();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const isArabic = i18n.language === "ar";
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [, setReFetch] = useState(false);
  const [isNewRequestOpened, { open: openNewRequest, close: closeNewRequest }] =
    useDisclosure(false);
  const {
    data: transactions,
    isLoading,
    error,
  } = useQuery<Transactions[], Error>({
    queryKey: ["transactionData"],
    queryFn: fetchTransactions,
  });
  const formattedData = transactions
    ? transactions.map(formatTransactionsForTable)
    : [];
  const totalItems = formattedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const start = (activePage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const dataToDisplay = useMemo(() => {
    return formattedData.slice(start, end);
  }, [formattedData, start, end]);
  const headers = [
    t("Type"),
    t("Currency"),
    t("Amount"),
    t("Method"),
    t("Status"),
  ];
  if (error) {
    return (
      <Center h="70vh">
        <Text c={"red"} size="lg">
          {t("Error fetching deals :")} {error.message}
        </Text>
      </Center>
    );
  }
  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case "completed":
        return "#53D258";
      case "pending":
        return "#FFD83D";
      case "failed":
        return "#EE1D52";
      default:
        return "#FFF";
    }
  };
  const rows = dataToDisplay.map((item, index) => (
    <Table.Tr
      key={index}
      style={{
        borderBottom: "1px solid #FF9B42",
        height: "75px",
        textAlign: "center",
      }}
    >
      <Table.Td
        fz={"20px"}
        fw={400}
        style={{ fontFamily: "'Inter', sans-serif" }}
        c={"#F8F8FC"}
      >
        {item.type}
      </Table.Td>
      <Table.Td
        fz={"20px"}
        fw={400}
        style={{ fontFamily: "'Inter', sans-serif" }}
        c={"#F8F8FC"}
      >
        {item.currency}
      </Table.Td>
      <Table.Td
        fz={"20px"}
        fw={400}
        style={{ fontFamily: "'Inter', sans-serif" }}
        c={"#F8F8FC"}
      >
        {item.amount}
      </Table.Td>
      <Table.Td
        fz={"20px"}
        fw={400}
        style={{ fontFamily: "'Inter', sans-serif" }}
        c={"#F8F8FC"}
      >
        {item.method}
      </Table.Td>
      <Table.Td
        c={getStatusColor(item.status)}
        fz={"20px"}
        fw={400}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {item.status}
      </Table.Td>
    </Table.Tr>
  ));
  const paginationStore: PaginationControl = {
    current_page: activePage,
    setItems_per_page: (value) => {
      setItemsPerPage(value);
      setActivePage(1);
    },
    setCurrent_page: setActivePage,
    total_items: totalItems,
    items_per_page: itemsPerPage,
    total_pages: totalPages,
    setReFetch: setReFetch,
  };
  return (
    <>
      <Flex direction={"column"} gap={"20px"}>
        <Flex justify={"space-between"} px={"40px"} align={"center"}>
          <Flex align={"center"} gap={"18px"}>
            <Text
              fw={"700"}
              fz={isMobile ? "20px" : "31px"}
              style={{ lineHeight: "130%" }}
              c={"#0A1F44"}
            >
              {t("Transactions")}
            </Text>
          </Flex>
          <Flex justify={"space-between"} align={"center"}>
            <Button
              h={"48px"}
              fz={isMobile ? "10px" : "12px"}
              w={isMobile ? "117px" : "140px"}
              style={{ gap: "1px", border: "3px solid #FF9B42" }}
              bg={"#0A1F44"}
              radius={"8px"}
              justify="space-between"
              onClick={openNewRequest}
            >
              {t("New Request")}{" "}
              <IconPlus
                size={"20px"}
                style={{
                  marginRight: isArabic ? "20px" : "0px",
                  marginLeft: isArabic ? "0px" : "10px",
                }}
              />{" "}
            </Button>
          </Flex>
        </Flex>
        {isLoading ? (
          <Center h="70vh">
            <Loader color="#FF9B42" size="xl" />
          </Center>
        ) : (
          <Box px={"40px"}>
            <Table.ScrollContainer minWidth={800}>
              <Table
                style={{
                  backgroundColor: "#0A1F44",
                  borderRadius: "12px",
                }}
                fz="sm"
                verticalSpacing="sm"
                c="white"
              >
                <Table.Thead
                  style={{
                    backgroundColor: "#0A1F44",
                    textAlign: "center",
                  }}
                  fz={"20px"}
                  c={"#F8F8FC"}
                  fw={"600"}
                  lh={"150%"}
                >
                  <Table.Tr>
                    {headers.map((headers, index) => (
                      <Table.Th
                        key={index}
                        c="#F8F8FC"
                        fw={600}
                        fz={"24px"}
                        style={{
                          textTransform: "none",
                          textAlign: "center",
                          padding: "20px 16px",
                          borderBottom: "2px solid #FF9B42",
                          borderTopLeftRadius: "12px",
                          borderTopRightRadius: "12px",
                          whiteSpace: "nowrap",
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {headers}
                      </Table.Th>
                    ))}
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
              <Box py={"20px"}>
                {totalItems > 0 && <CustomPagination store={paginationStore} />}
              </Box>
            </Table.ScrollContainer>
          </Box>
        )}
      </Flex>
      <NewRequest opened={isNewRequestOpened} onClose={closeNewRequest} />
    </>
  );
}
