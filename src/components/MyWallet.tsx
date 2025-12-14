import {
  Box,
  Button,
  Center,
  Flex,
  Loader,
  Select,
  Table,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import DetailsWallet from "./DetailsWallet";
import { useMemo, useState } from "react";
import { IconChevronUp, IconChevronDown } from "@tabler/icons-react";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
import classes from "./PaginationStyles.module.css";
const DEALS_ENDPOINT = "/wallet";
import CustomPagination from "./Pagination";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mantine/hooks";
const WALLET_URL = `${
  BASE_URL.endsWith("/api") ? BASE_URL : BASE_URL + "/api"
}${DEALS_ENDPOINT}`;
interface Wallet {
  Name: string;
  Type: string;
  Quantity_Units: string;
  Current_Price: string;
  Value: string;
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
async function fetchWallet(): Promise<Wallet[]> {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    throw new Error("Authentication token not found. Please log in.");
  }

  const response = await fetch(WALLET_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Failed to fetch wallet" }));
    throw new Error(
      errorData.message ||
        `Failed to fetch deals with status: ${response.status}`
    );
  }
  const data = await response.json();
  return data.wallet_assets;
}
const formatWalletForTable = (wallet: Wallet) => {
  return {
    name: `${wallet.Name}`,
    type: wallet.Type,
    quantity: wallet.Quantity_Units,
    current_price: `${wallet.Current_Price} $`,
    value: `${wallet.Value} $`,
  };
};
export default function MyWallet() {
  const [activePage, setActivePage] = useState(1);
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [, setReFetch] = useState(false);
  const [value, setValue] = useState<string | null>("All");
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const {
    data: wallet,
    isLoading,
    error,
    refetch,
  } = useQuery<Wallet[], Error>({
    queryKey: ["wallet_assets"],
    queryFn: fetchWallet,
  });
  const formattedData = wallet ? wallet.map(formatWalletForTable) : [];
  const filteredData = useMemo(() => {
    if (!value || value === "All") {
      return formattedData;
    }
    return formattedData.filter(
      (item) => item.type.toLowerCase() === value.toLowerCase()
    );
  }, [formattedData, value]);
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const start = (activePage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const dataToDisplay = useMemo(() => {
    return filteredData.slice(start, end);
  }, [filteredData, start, end]);
  const handleSelectChange = (selectedValue: string | null) => {
    setValue(selectedValue);
    setActivePage(1);
  };
  const headers = [
    t("Name"),
    t("Type"),
    t("Quantity / Units"),
    t("Current Price"),
    t("Value"),
  ];
  if (error) {
    return (
      <>
        <Center h="70vh">
          <Text c="red" size="lg">
            {t("Error fetching deals:")} {error.message}
          </Text>
        </Center>
      </>
    );
  }
  const rows = dataToDisplay.map((item, index) => (
    <Table.Tr
      key={index}
      style={{
        borderBottom: "1px solid #FF9B42",
        height: "75px",
        textAlign: "center",
      }}
    >
      <Table.Td>
        <Flex justify={"center"} align={"center"} gap={"4px"}>
          <Text>{item.name}</Text>
        </Flex>
      </Table.Td>
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
        {item.quantity}
      </Table.Td>
      <Table.Td
        fz={"20px"}
        fw={400}
        style={{ fontFamily: "'Inter', sans-serif" }}
        c={"#F8F8FC"}
      >
        {item.current_price}
      </Table.Td>
      <Table.Td
        fz={"20px"}
        fw={400}
        style={{ fontFamily: "'Inter', sans-serif" }}
        c={"#F8F8FC"}
      >
        {item.value}
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
  const data = [
    { value: "All", label: t("All") },
    { value: "crypto", label: t("Cryptocurrency") },
    { value: "commodities", label: t("Commodity") },
    { value: "stocks", label: t("Stock") },
    { value: "forex", label: t("Forex") },
    { value: "indices", label: t("Indices") },
  ];
  return (
    <Flex direction={"column"} gap={"20px"}>
      <Flex justify={"space-between"} px={"40px"} align={"center"}>
        <Flex align={"center"} gap={"18px"}>
          <Text
            fw={"700"}
            fz={isMobile ? "20px" : "31px"}
            style={{ lineHeight: "130%" }}
            c={"#0A1F44"}
          >
            {t("My Wallet")}
          </Text>
        </Flex>
        <Flex gap={"10px"}>
          <Flex direction="column" align="center" justify="center">
            <Select
              value={value}
              onChange={handleSelectChange}
              data={data}
              placeholder="All"
              onDropdownOpen={() => setDropdownOpened(true)}
              onDropdownClose={() => setDropdownOpened(false)}
              rightSection={
                dropdownOpened ? (
                  <IconChevronUp size={isMobile ? 15 : 20} color="#FF9B42" />
                ) : (
                  <IconChevronDown size={isMobile ? 15 : 20} color="#FF9B42" />
                )
              }
              rightSectionWidth={isMobile ? 20 : 30}
              withCheckIcon={false}
              classNames={{
                dropdown: classes.dropdown,
                option: classes.option,
              }}
              styles={{
                input: {
                  backgroundColor: "#0A1F44",
                  color: "#FFFFFF",
                  borderRadius: "12px",
                  border: "1px solid #FF9B42",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: isMobile ? "13px" : "16px",
                  fontWeight: 400,
                  height: "46px",
                  width: isMobile ? "120px" : "150px",
                  textAlign: "center",
                  paddingLeft: isMobile ? "5px" : "0px",
                  paddingRight: isMobile ? "20px" : "30px",
                  cursor: "pointer",
                  "&:focus, &:focus-within": {
                    outline: "none",
                    borderColor: "#FF9B42",
                  },
                },
              }}
            />
          </Flex>
          <Button
            w={isMobile ? "90px" : "122px"}
            h={"48px"}
            px={isMobile ? "10px" : "15px"}
            justify={"center"}
            style={{
              alignItems: "center",
              gap: "1px",
              border: "3px solid #FF9B42",
            }}
            bg={"#0A1F44"}
            radius={"8px"}
            onClick={() => refetch()}
          >
            {t("Refresh")}
          </Button>
        </Flex>
      </Flex>
      {isLoading ? (
        <Center h="70vh">
          <Loader color="#FF9B42" size="xl" />
        </Center>
      ) : (
        <Box px={"30px"}>
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
                  {headers.map((header, index) => (
                    <Table.Th
                      key={index}
                      c="#F8F8FC"
                      fs={"24px"}
                      fw={600}
                      style={{
                        textTransform: "none",
                        textAlign: "center",
                        padding: "20px 16px",
                        borderBottom: "2px solid #FF9B42",
                        borderTopLeftRadius: "12px",
                        borderTopRightRadius: "12px",
                        fontFamily: "'Inter', sans-serif",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {header}
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
      <DetailsWallet />
    </Flex>
  );
}
