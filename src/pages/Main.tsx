import { Flex, useMantineTheme } from "@mantine/core";
import HeaderMain from "../components/HeaderMain";
import CandlestickChart from "../components/CandlestickChart";
import AssetClasses from "../components/AssetClasses";
import { useMediaQuery } from "@mantine/hooks";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { IconCheck, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import TradingForm from "../components/TradingForm";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const ORDER_ENDPOINT = "/order";
const ASSET_DATA_ENDPOINT = "/assets";
const ORDER_URL = `${
  BASE_URL.endsWith("/api") ? BASE_URL : BASE_URL + "/api"
}${ORDER_ENDPOINT}`;
const ASSET_DATA_URL = `${
  BASE_URL.endsWith("/api") ? BASE_URL : BASE_URL + "/api"
}${ASSET_DATA_ENDPOINT}`;

type FormInfoType = {
  asset_id: string;
  leverage?: string;
  lots?: string;
  order_type?: string;
  stop_loss?: string;
  take_profit?: string;
  pending_order?: string;
  side: "buy" | "sell";
};

interface AssetDataResponse {
  asset: {
    id: number;
    name: string;
    symbol: string;
    category: string;
  };
  candlesticks: {
    open: number;
    high: number;
    low: number;
    close: number;
    timestamp: string;
  }[];
  latest: {
    leverage?: number | string;
  };
  buy_price?: string;
  sell_price?: string;
}

async function fetchPostOrder({
  asset_id,
  leverage,
  lots,
  order_type,
  stop_loss,
  take_profit,
  pending_order,
  side,
}: FormInfoType) {
  const authToken = localStorage.getItem("authToken");
  if (!BASE_URL) {
    throw new Error(
      "VITE_BACKEND_URL is not defined in environment variables."
    );
  }

  const response = await fetch(ORDER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      asset_id,
      leverage,
      lots,
      order_type,
      stop_loss,
      take_profit,
      pending_order,
      side,
    }),
  });
  console.log(response);
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "unknown error" }));
    const errorMessage =
      errorData.message ||
      errorData.error ||
      `Register failed with status: ${response.status}`;
    throw new Error(errorMessage);
  }
  return response.json();
}
async function fetchAssetData(assetId: string): Promise<AssetDataResponse> {
  const authToken = localStorage.getItem("authToken");
  if (!BASE_URL || !authToken) {
    throw new Error("Missing environment variable or Auth Token.");
  }
  const url = `${ASSET_DATA_URL}/${assetId}/data`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    throw new Error(
      `Failed to fetch asset data for ID ${assetId}. Status: ${response.status}. Details: ${errorText}`
    );
  }
  //   const data = (await response.json()) as AssetDataResponse;
  //   if (data.candlesticks && data.candlesticks.length > 0) {
  //     const latestClose = data.candlesticks[data.candlesticks.length - 1].close;
  //     (data as any).buy_price = (latestClose + latestClose * 0.00005).toFixed(2);
  //     (data as any).sell_price = latestClose.toFixed(2);
  //   } else {
  //     (data as any).buy_price = "";
  //     (data as any).sell_price = "";
  //   }
  //   if (data.latest.leverage) {
  //     data.latest.leverage = `x${data.latest.leverage}`;
  //     console.log(data.latest.leverage);
  //   }
  //   return data;
  // }
  const data: AssetDataResponse = await response.json();

  if (data.candlesticks.length > 0) {
    const latestClose = data.candlesticks[data.candlesticks.length - 1].close;
    data.buy_price = (latestClose + latestClose * 0.00005).toFixed(2);
    data.sell_price = latestClose.toFixed(2);
  } else {
    data.buy_price = "";
    data.sell_price = "";
  }

  return data;
}
export default function Main() {
  const [assetId, setAssetId] = useState("2");
  const [assetSymbol, setAssetSymbol] = useState("XAG/USD");
  const [buyPrice, setBuyPrice] = useState("9,100.0");
  const [sellPrice, setSellPrice] = useState("9,150.0");
  const [leverage, setLeverage] = useState("");
  const [orderType, setOrderType] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [takeProfit, setTakeProfit] = useState("");
  const [pendingOrder, setPendingOrder] = useState("");
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const [lotsValue, setLotsValue] = useState(0.1);
  const [marginCost, setMarginCost] = useState("0.00");
  const handleAssetSelect = (id: string, leverageValue: string | number) => {
    setAssetId(id);
    setLeverage(`x${leverageValue}`);
  };
  const calculateMarginCost = (
    currentLots: number,
    currentLeverage: string,
    currentPrice: string
  ): string => {
    const priceValue = parseFloat(currentPrice.replace(/,/g, ""));
    const leverageValue = parseFloat(
      currentLeverage.startsWith("x")
        ? currentLeverage.substring(1)
        : currentLeverage
    );
    if (isNaN(priceValue) || isNaN(leverageValue) || leverageValue === 0) {
      return "0.00";
    }
    // const contractSize = 100000;
    // const nominalValue = currentLots * contractSize * priceValue;
    // const requiredMargin = nominalValue / leverageValue;
    const finalCost = (currentLots * priceValue) / leverageValue;
    return finalCost.toFixed(2);
  };
  useEffect(() => {
    const loadAssetData = async () => {
      try {
        const data = await fetchAssetData(assetId);
        setAssetSymbol(data.asset.symbol);
        setBuyPrice(
          String(data.buy_price).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        );
        setSellPrice(
          String(data.sell_price).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        );
        const currentLeverage = String(data.latest.leverage || "x10");
        const currentBuyPrice = String(data.buy_price || "0");
        setLeverage(currentLeverage);
        const newMargin = calculateMarginCost(
          lotsValue,
          currentLeverage,
          currentBuyPrice
        );
        setMarginCost(newMargin);
        if (data.latest.leverage) {
          setLeverage(String(data.latest.leverage));
        } else {
          setLeverage("x10");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error("Unknown error", err);
        }
      }
    };

    if (assetId) {
      loadAssetData();
    }
  }, [assetId, lotsValue, leverage]);

  const incrementLots = () => {
    setLotsValue((prev) => parseFloat((prev + 0.1).toFixed(1)));
  };
  const decrementLots = () => {
    setLotsValue((prev) =>
      prev > 0.1 ? parseFloat((prev - 0.1).toFixed(1)) : 0.1
    );
  };
  const formatLots = (value: number) => value.toFixed(1);
  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => {
    const numericValue = value.replace(/[^0-9.]/g, "");
    setter(numericValue);
  };

  const isStopLossDisabled =
    takeProfit.length > 0 && parseFloat(takeProfit) > 0;
  const isTakeProfitDisabled = stopLoss.length > 0 && parseFloat(stopLoss) > 0;

  const handleSubmitOrder = async (orderSide: "buy" | "sell") => {
    const currentOrderType = orderType || orderSide;
    const isMarketOrder =
      currentOrderType === "buy" || currentOrderType === "sell";

    const formData: Partial<FormInfoType> = {
      asset_id: assetId,
      lots: formatLots(lotsValue),
      order_type: currentOrderType,
      side: orderSide,
    };
    const numericLeverage = leverage.startsWith("x")
      ? leverage.substring(1)
      : leverage;
    if (numericLeverage && !isNaN(parseFloat(numericLeverage))) {
      formData.leverage = numericLeverage;
    }
    if (takeProfit && parseFloat(takeProfit) > 0) {
      formData.take_profit = takeProfit;
    }
    if (stopLoss && parseFloat(stopLoss) > 0) {
      formData.stop_loss = stopLoss;
    }
    if (!isMarketOrder) {
      if (pendingOrder && parseFloat(pendingOrder) > 0) {
        formData.pending_order = pendingOrder;
      } else {
        alert(
          `Order failed: Pending price (Pending Order field) is required for ${currentOrderType}.`
        );
        return;
      }
    } else {
      delete formData.pending_order;
    }
    if (!formData.asset_id || !formData.lots || !formData.side) {
      console.error("Missing mandatory fields (asset_id, lots, or side)");
      alert("Order failed: Missing mandatory fields.");
      return;
    }
    console.log("JSON Payload being sent:", JSON.stringify(formData, null, 2));
    try {
      const result = await fetchPostOrder(formData as FormInfoType);
      console.log("Order successful:", result);
      notifications.show({
        title: `${orderSide.toUpperCase()} Successful!`,
        message: `${currentOrderType} request submitted successfully. It is now being processed.`,
        color: "green",
        icon: <IconCheck />,
        autoClose: 5000,
      });
      setLotsValue(0.1);
      setOrderType("");
      setStopLoss("");
      setTakeProfit("");
      setPendingOrder("");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      alert(`Order failed: ${errorMessage}`);
      notifications.show({
        title: `${orderSide.toUpperCase()} Failed`,
        message: `Failed to process ${currentOrderType} request: ${errorMessage}`,
        color: "red",
        icon: <IconX />,
      });
      setLotsValue(0.1);
      setOrderType("");
      setStopLoss("");
      setTakeProfit("");
      setPendingOrder("");
    }
  };

  return (
    <>
      <HeaderMain />
      <Flex
        justify={"space-around"}
        w={"100%"}
        pt={"50px"}
        h={"52%"}
        px={isMobile ? "20px" : "40px"}
        gap={isMobile ? "30px" : "20px"}
        direction={isMobile ? "column" : undefined}
      >
        <AssetClasses onAssetSelect={handleAssetSelect} />
        <CandlestickChart
          assetSymbol={assetSymbol}
          buyPrice={buyPrice}
          sellPrice={sellPrice}
        />
      </Flex>

      <TradingForm
        assetSymbol={assetSymbol}
        buyPrice={buyPrice}
        sellPrice={sellPrice}
        lotsValue={lotsValue}
        leverage={leverage}
        orderType={orderType}
        pendingOrder={pendingOrder}
        takeProfit={takeProfit}
        stopLoss={stopLoss}
        marginCost={marginCost}
        isMobile={isMobile}
        isStopLossDisabled={isStopLossDisabled}
        isTakeProfitDisabled={isTakeProfitDisabled}
        incrementLots={incrementLots}
        decrementLots={decrementLots}
        formatLots={formatLots}
        // setOrderType={setOrderType}
        setOrderType={(value) => setOrderType(value || "")}
        handleInputChange={handleInputChange}
        handleSubmitOrder={handleSubmitOrder}
        setPendingOrder={setPendingOrder}
        setTakeProfit={setTakeProfit}
        setStopLoss={setStopLoss}
        setLeverage={setLeverage}
      />

      <Footer />
    </>
  );
}
