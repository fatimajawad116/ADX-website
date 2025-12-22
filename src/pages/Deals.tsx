import {
  Button,
  Flex,
  Text,
  Table,
  Box,
  Loader,
  Center,
  useMantineTheme,
} from "@mantine/core";
import HeaderMain from "../components/HeaderMain";
import Arrow from "../assets/Group 8766.svg";
import { IconCircleMinus, IconPencil } from "@tabler/icons-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useMemo, useState } from "react";
import EditTradeModal from "../components/EditTradeModal";
import CloseDealsModal from "../components/CloseDealsModal";
import CustomPagination from "../components/Pagination";
import { useTranslation } from "react-i18next";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const DEALS_ENDPOINT = "/deals";
const DEALS_URL = `${
  BASE_URL.endsWith("/api") ? BASE_URL : BASE_URL + "/api"
}${DEALS_ENDPOINT}`;
const ORDERS_BASE_URL = `${
  BASE_URL.endsWith("/api") ? BASE_URL : BASE_URL + "/api"
}/orders`;

interface Deal {
  id: number;
  user_id: number;
  order_id: number;
  symbol: string;
  side: "buy" | "sell";
  lots: number;
  entry_price: string;
  close_price: string;
  pnl: string;
  executed_at: string;
  created_at: string;
  updated_at: string;
  stop_loss: string;
  take_profit: string;
  current_rate: string;
  status: string;
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
async function fetchDeals(dealType: "open" | "closed"): Promise<Deal[]> {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    throw new Error("Authentication token not found. Please log in.");
  }
  const response = await fetch(DEALS_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Failed to fetch deals" }));
    throw new Error(
      errorData.message ||
        `Failed to fetch deals with status: ${response.status}`
    );
  }

  const data = await response.json();
  if (dealType === "open") {
    return [...(data.open_deals || []), ...(data.pending_deals || [])];
  }

  return data.closed_deals || [];
}

// const formatDealForTable = (deal: Deal) => {
//   const pnlValue = parseFloat(deal.pnl);
//   const profitLoss = pnlValue.toFixed(2);
//   const profitLossColor = pnlValue >= 0 ? "#53D258" : "#E25C5C";
//   const executedDate = new Date(deal.executed_at);
//   const datePart = executedDate.toISOString().split("T")[0];
//   const timePart = executedDate.toLocaleTimeString("en-US", {
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//     hour12: false,
//   });
//   const openTime = `${datePart}\n${timePart}`;
//    const isClosed = deal.status === "closed";
//   return {
//     id: `#${deal.order_id}`,
//     order_id: deal.order_id,
//     symbol: `${deal.asset_id}`,
//     action: deal.side.charAt(0).toUpperCase() + deal.side.slice(1),
//     lot: deal.lots.toFixed(2),
//     openTime: openTime,
//     takeProfit: deal.take_profit || "N/A",
//     stopLoss: deal.stop_loss || "N/A",
//     openRate: deal.entry_price || "N/A",
//     currentRate: deal.current_rate || "N/A",
//     profitLoss: profitLoss,
//     profitLossColor: profitLossColor,
//     isClosed: isClosed,
//   };
// };
const formatDealForTable = (deal: Deal) => {
  const pnlValue = parseFloat(deal.pnl);
  const profitLoss = pnlValue.toFixed(2);
  const profitLossColor = pnlValue >= 0 ? "#53D258" : "#E25C5C";

  const dateSource =
    deal.status === "pending" ? deal.created_at : deal.executed_at;

  let datePart = "-";
  let timePart = "";

  if (dateSource) {
    const parsedDate = new Date(dateSource);

    if (!isNaN(parsedDate.getTime())) {
      datePart = parsedDate.toISOString().split("T")[0];
      timePart = parsedDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
    }
  }

  const openTime = timePart ? `${datePart}\n${timePart}` : datePart;

  const isPending = deal.status === "pending";
  const isClosed = deal.status === "closed" || deal.status === "executed";

  return {
    id: `#${deal.order_id}`,
    order_id: deal.order_id,
    symbol: `${deal.symbol}`,
    action: deal.side.charAt(0).toUpperCase() + deal.side.slice(1),
    lot: Number(deal.lots).toFixed(2),
    openTime,
    takeProfit: deal.take_profit || "",
    stopLoss: deal.stop_loss || "",
    openRate: deal.entry_price || "",
    currentRate: deal.current_rate || "",
    closePrice: deal.close_price || "",
    profitLoss,
    profitLossColor,
    isClosed,
    isPending,
  };
};

interface UpdateSettingsPayload {
  take_profit: number;
  stop_loss: number;
}

async function updateDealSettings(
  orderId: number,
  settings: UpdateSettingsPayload
) {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    throw new Error("Authentication token not found. Please log in.");
  }
  const url = `${ORDERS_BASE_URL}/${orderId}/settings`;
  const payload = {
    take_profit: parseFloat(settings.take_profit.toFixed(2)),
    stop_loss: parseFloat(settings.stop_loss.toFixed(2)),
  };
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Failed to update deal settings" }));
    throw new Error(
      errorData.message ||
        `Failed to update deal settings with status: ${response.status}`
    );
  }
  return response.json();
}
async function closeDeal(orderId: number) {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    throw new Error("Authentication token not found. Please log in.");
  }
  const url = `${ORDERS_BASE_URL}/${orderId}/close`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Failed to close deal" }));
    throw new Error(
      errorData.message ||
        `Failed to close deal with status: ${response.status}`
    );
  }
  return response.json();
}
export default function Deals() {
  const { t, i18n } = useTranslation();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const isArabic = i18n.language === "ar";
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [, setReFetch] = useState(false);
  const queryClient = useQueryClient();
  const [dealType, setDealType] = useState<"open" | "closed">("open");
  const {
    data: deals,
    isLoading,
    error,
    refetch,
  } = useQuery<Deal[], Error>({
    queryKey: ["dealsData", dealType],
    queryFn: () => fetchDeals(dealType),
  });
  // const formattedData = deals
  //   ? deals.map((deal) => ({
  //       ...formatDealForTable(deal),
  //       orderId: deal.order_id,
  //     }))
  //   : [];
  const formattedData = deals
    ? deals.map((deal) => {
        const dealDate =
          deal.status === "pending" ? deal.created_at : deal.executed_at;

        return {
          ...formatDealForTable(deal),
          orderId: deal.order_id,
          dealDate,
        };
      })
    : [];

  const totalItems = formattedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const start = (activePage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const sortedData = [...formattedData].sort((a, b) => {
    return new Date(b.dealDate).getTime() - new Date(a.dealDate).getTime();
  });
  const dataToDisplay = useMemo(() => {
    return sortedData.slice(start, end);
  }, [formattedData, start, end]);
  const [isCloseModalOpened, { open: openCloseModal, close: closeCloseModal }] =
    useDisclosure(false);
  const [dealToClose, setDealToClose] = useState<{
    id: string;
    orderId: number;
  } | null>(null);
  const updateMutation = useMutation({
    mutationFn: ({
      orderId,
      settings,
    }: {
      orderId: number;
      settings: UpdateSettingsPayload;
    }) => updateDealSettings(orderId, settings),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dealsData", "open"] });
      // closeCloseModal();
      setDealToClose(null);
      close();
      console.log("Deal settings updated successfully! Refetching deals...");
    },
    onError: (error) => {
      console.error("Error updating deal settings:", error);
      alert(`Update failed: ${error.message}`);
    },
  });
  const closeMutation = useMutation({
    mutationFn: (orderId: number) => closeDeal(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dealsData", "open"] });
      closeCloseModal();
      setDealToClose(null);
      console.log("Deal closed successfully! Refetching deals...");
    },
    onError: (error) => {
      console.error("Error closing deal:", error);
      alert(`Close failed: ${error.message}`);
    },
  });
  const [opened, { open, close }] = useDisclosure(false);
  const [editData, setEditData] = useState({
    id: "",
    orderId: 0,
    takeProfit: "",
    stopLoss: "",
  });
  interface OrderItem {
    id: string;
    takeProfit: string;
    stopLoss: string;
    isClosed: boolean;
  }
  const handleEditClick = (item: OrderItem) => {
    if (updateMutation.isPending || closeMutation.isPending) return;
    const orderId = parseInt(item.id.replace("#", ""), 10);
    setEditData({
      id: item.id,
      orderId: orderId,
      takeProfit: item.takeProfit === "" ? "0.00" : item.takeProfit,
      stopLoss: item.stopLoss === "" ? "0.00" : item.stopLoss,
    });
    open();
  };

  const handleConfirmEdit = () => {
    console.log(
      `Attempting to confirm edit for Deal ID: ${editData.id} (Order ID: ${editData.orderId})`
    );
    const payload: UpdateSettingsPayload = {
      take_profit: parseFloat(editData.takeProfit),
      stop_loss: parseFloat(editData.stopLoss),
    };
    updateMutation.mutate({ orderId: editData.orderId, settings: payload });
  };
  interface closeClick {
    id: string;
    isClosed: boolean;
  }
  const handleCloseClick = (item: closeClick) => {
    if (item.isClosed || updateMutation.isPending || closeMutation.isPending)
      return;
    const orderId = parseInt(item.id.replace("#", ""), 10);
    setDealToClose({ id: item.id, orderId: orderId });
    openCloseModal();
  };
  const handleConfirmClose = () => {
    if (dealToClose) {
      console.log(
        `Attempting to close Deal ID: ${dealToClose.id} (Order ID: ${dealToClose.orderId})`
      );
      closeMutation.mutate(dealToClose.orderId);
    }
  };
  const toggleDealType = () => {
    if (updateMutation.isPending || closeMutation.isPending || isLoading)
      return;
    setDealType((prevType) => {
      const newType = prevType === "open" ? "closed" : "open";
      return newType;
    });
  };
  const headers = [
    "",
    "P-ID",
    t("Symbol"),
    t("Action"),
    t("Lot"),
    t("Open Time"),
    t("Take Profit"),
    t("Stop Loss"),
    t("Open Rate"),
    dealType === "open" ? t("Current Rate") : t("Close Rate"),
    t("Profit / Loss"),
  ];

  if (error) {
    return (
      <>
        <HeaderMain />
        <Center h="70vh">
          <Text c="red" size="lg">
            Error fetching deals: {error.message}
          </Text>
        </Center>
      </>
    );
  }

  const isAnyActionPending =
    updateMutation.isPending || closeMutation.isPending;
  const rows = dataToDisplay.map((item, index) => {
    return (
      <Table.Tr
        key={index}
        style={{
          borderBottom: "1px solid #FF9B42",
          height: "75px",
          textAlign: "center",
          backgroundColor: item.isPending
            ? "rgba(255, 255, 255, 0.1)"
            : "#0A1F44",
          opacity: item.isPending ? 0.7 : 1,
          pointerEvents: item.isPending ? "none" : "auto",
        }}
      >
        <Table.Td>
          {dealType === "open" && (
            <Flex justify={"center"} align={"center"} gap={"20px"}>
              <IconCircleMinus
                size={23}
                color={item.isPending ? "#888" : "#FF9B42"}
                style={{ cursor: item.isPending ? "not-allowed" : "pointer" }}
                onClick={
                  item.isPending ? undefined : () => handleCloseClick(item)
                }
              />
              <IconPencil
                size={23}
                color={item.isPending ? "#888" : "#FF9B42"}
                style={{ cursor: item.isPending ? "not-allowed" : "pointer" }}
                onClick={
                  item.isPending ? undefined : () => handleEditClick(item)
                }
              />
            </Flex>
          )}
        </Table.Td>
        <Table.Td>{item.id}</Table.Td>
        <Table.Td>{item.symbol}</Table.Td>
        <Table.Td>{item.action}</Table.Td>
        <Table.Td>{item.lot}</Table.Td>
        <Table.Td>
          <Flex direction="column" gap={0}>
            <Text fz="sm" lh={1.2}>
              {item.openTime.split("\n")[0]}
            </Text>
            <Text fz="xs" c="dimmed" lh={1.2}>
              {item.openTime.split("\n")[1]}
            </Text>
          </Flex>
        </Table.Td>
        <Table.Td>{item.takeProfit}</Table.Td>
        <Table.Td>{item.stopLoss}</Table.Td>
        <Table.Td>{item.openRate}</Table.Td>
        <Table.Td>
          {dealType === "open"
            ? item.currentRate
            : item.closePrice || item.currentRate}
        </Table.Td>
        <Table.Td>
          <Text fw={600} c={item.profitLossColor}>
            {item.profitLoss}
          </Text>
        </Table.Td>
      </Table.Tr>
    );
  });

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
  const headerTitle =
    dealType === "open" ? t("Active Deals") : t("Closed Deals");
  const arrowStyle =
    dealType === "open"
      ? { transform: isArabic ? "rotate(180deg)" : "rotate(0deg)" }
      : { transform: isArabic ? "rotate(0deg)" : "rotate(180deg)" };
  return (
    <Flex direction={"column"} gap={"30px"} h={"100%"}>
      <HeaderMain />
      <Flex direction={"column"} gap={"20px"}>
        <Flex justify={"space-between"} px={"40px"} align={"center"}>
          <Flex align={"center"} gap={"18px"}>
            <Text fw={"700"} fz={isMobile ? "20px" : "31px"} c={"#0A1F44"}>
              {headerTitle}
            </Text>
            <img
              src={Arrow}
              alt="arrow"
              width={isMobile ? "10px" : "15px"}
              onClick={toggleDealType}
              style={{
                cursor: "pointer",
                transition: "transform 0.3s",
                ...arrowStyle,
              }}
            />
          </Flex>
          <Button
            w={isMobile ? "100px" : "122px"}
            h={"48px"}
            px={isMobile ? "20px" : "32px"}
            justify={"center"}
            style={{
              alignItems: "center",
              gap: "1px",
              border: "3px solid #FF9B42",
            }}
            bg={"#0A1F44"}
            radius={"8px"}
            onClick={() => refetch()}
            disabled={isAnyActionPending}
          >
            {t("Refresh")}
          </Button>
        </Flex>
        {isLoading || isAnyActionPending ? (
          <Center h="70vh">
            <Loader color="#FF9B42" size="xl" />
          </Center>
        ) : (
          <Box px={"30px"}>
            <Table.ScrollContainer minWidth={1200}>
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
                  fz="20px"
                  c="#F8F8FC"
                  fw={"600"}
                  lh={"150%"}
                >
                  <Table.Tr>
                    {headers.map((header, index) => (
                      <Table.Th
                        key={index}
                        c="white"
                        fw={600}
                        style={{
                          textTransform: "none",
                          textAlign: "center",
                          padding: "20px 16px",
                          borderBottom: "2px solid #FF9B42",
                          borderTopLeftRadius: "12px",
                          borderTopRightRadius: "12px",
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
      </Flex>
      <EditTradeModal
        opened={opened}
        onClose={close}
        editData={editData}
        setEditData={setEditData}
        onConfirm={handleConfirmEdit}
        isUpdating={updateMutation.isPending}
      />
      <CloseDealsModal
        opened={isCloseModalOpened}
        onClose={closeCloseModal}
        onConfirm={handleConfirmClose}
        isUpdating={closeMutation.isPending}
        dealId={dealToClose?.id || ""}
      />
    </Flex>
  );
}
