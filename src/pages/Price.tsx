import { Flex, useMantineTheme } from "@mantine/core";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useMediaQuery } from "@mantine/hooks";
import AssetClasses from "../components/AssetClasses";
import CandlestickChart from "../components/CandlestickChart";
import { useEffect, useState } from "react";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const ASSET_DATA_ENDPOINT = "/assets";
const ASSET_DATA_URL = `${
  BASE_URL?.endsWith("/api") ? BASE_URL : BASE_URL + "/api"
}${ASSET_DATA_ENDPOINT}`;

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
  // const data = (await response.json()) as AssetDataResponse;
  const data: AssetDataResponse = await response.json();
  //   if (data.candlesticks && data.candlesticks.length > 0) {
  //     const latestClose = data.candlesticks[data.candlesticks.length - 1].close;
  //     (data as any).buy_price = (latestClose + latestClose * 0.00005).toFixed(2);
  //     (data as any).sell_price = latestClose.toFixed(2);
  //   } else {
  //     (data as any).buy_price = "";
  //     (data as any).sell_price = "";
  //   }
  //   return data;
  // }
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
export default function Price() {
  const theme = useMantineTheme();
  const [assetId, setAssetId] = useState("2");
  const [assetSymbol, setAssetSymbol] = useState("Loading...");
  const [buyPrice, setBuyPrice] = useState("0.00");
  const [sellPrice, setSellPrice] = useState("0.00");
  const [, setLeverage] = useState("");
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  const handleAssetSelect = (id: string, leverageValue: string | number) => {
    setAssetId(id);
    setLeverage(`x${leverageValue}`);
  };

  useEffect(() => {
    const loadAssetData = async () => {
      try {
        const data = await fetchAssetData(assetId);
        setAssetSymbol(data.asset.symbol);
        setBuyPrice(
          String(data.buy_price || "0.00").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        );
        setSellPrice(
          String(data.sell_price || "0.00").replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ","
          )
        );
        if (data.latest.leverage) {
          setLeverage(`x${data.latest.leverage}`);
        } else {
          // AssetClasses
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error("Unknown error", err);
        }
        setAssetSymbol("Error");
        setBuyPrice("N/A");
        setSellPrice("N/A");
      }
    };

    if (assetId) {
      loadAssetData();
    }
  }, [assetId]);
  return (
    <>
      <Header />
      <Flex
        justify={"space-around"}
        w={"100%"}
        pt={"50px"}
        h={"100%"}
        mb={"20px"}
        px={isMobile ? "20px" : "70px"}
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
      <Footer />
    </>
  );
}
