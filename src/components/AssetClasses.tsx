import {
  ActionIcon,
  Box,
  Divider,
  Flex,
  Text,
  useMantineTheme,
  Loader,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const ASSETS_ENDPOINT = "/assets";
const ASSETS_URL = `${
  BASE_URL.endsWith("/api") ? BASE_URL : BASE_URL + "/api"
}${ASSETS_ENDPOINT}`;
interface AssetItem {
  id: number;
  symbol: string;
  name: string;
  sell_price: string | number;
  buy_price: string | number;
  leverage: number;
}

interface GroupedAssets {
  crypto: AssetItem[];
  commodities: AssetItem[];
  indices: AssetItem[];
  stocks: AssetItem[];
  forex: AssetItem[];
}

interface AssetInfo {
  id: number;
  symbol: string;
  leverage: number;
}

interface AssetClassData {
  name: string;
  items: AssetInfo[];
}

interface AssetClassesProps {
  onAssetSelect: (assetId: string, leverage: string | number) => void;
}

async function fetchAssets(): Promise<GroupedAssets> {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    throw new Error("Authentication token not found. Please log in.");
  }
  const response = await fetch(ASSETS_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    throw new Error(
      `Failed to fetch assets with status: ${response.status}. Details: ${errorText}`
    );
  }
  const data = await response.json();
  if (!data || !data.grouped_assets) {
    throw new Error(
      "Invalid data structure from API: 'grouped_assets' is missing."
    );
  }
  return data.grouped_assets;
}
type AssetClassKey = keyof GroupedAssets;
const transformAssetData = (groupedAssets: GroupedAssets): AssetClassData[] => {
  const classNames = Object.keys(groupedAssets) as AssetClassKey[];
  return classNames.map((className) => ({
    name: className.charAt(0).toUpperCase() + className.slice(1),
    items: groupedAssets[className].map((asset: AssetItem) => ({
      id: asset.id,
      symbol: asset.symbol,
      leverage: asset.leverage || 10,
    })),
  }));
};

export default function AssetClasses({ onAssetSelect }: AssetClassesProps) {
  const [openClass, setOpenClass] = useState<string | null>(null);
  const {
    data: groupedAssets,
    isLoading,
    error,
  } = useQuery<GroupedAssets, Error>({
    queryKey: ["assetClasses"],
    queryFn: fetchAssets,
  });
  const assetClasses = groupedAssets ? transformAssetData(groupedAssets) : [];
  const toggleClass = (name: string) => {
    setOpenClass((current) => (current === name ? null : name));
  };

  const LIST_BG = "#0A1F44";
  const BORDER_COLOR = "#FF9B42";
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  if (isLoading) {
    return (
      <Box
        p="md"
        bg={LIST_BG}
        style={{
          borderRadius: "8px",
          width: isMobile ? "100%" : "500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "200px",
        }}
      >
        <Loader color="#FF9B42" size="sm" />
        <Text c="#FFF" ml="sm">
          Loading assets...
        </Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        p="md"
        bg={LIST_BG}
        style={{ borderRadius: "8px", width: isMobile ? "100%" : "304px" }}
      >
        <Text c="red">Failed loading assets!</Text>
      </Box>
    );
  }

  return (
    <Box
      w={isMobile ? "100%" : "500px"}
      p="md"
      bg={LIST_BG}
      style={{
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Text
        fz={"24px"}
        fw={600}
        c="#FFF"
        mb="md"
        style={{
          borderBottom: `2px solid ${BORDER_COLOR}`,
          maxHeight: "40vh",
          overflowY: "auto",
        }}
      >
        {t("Asset Classes")}
      </Text>
      {assetClasses.map((assetClass, index) => (
        <Box key={assetClass.name}>
          <Flex
            align="center"
            justify="flex-start"
            gap={"20px"}
            py="sm"
            h={isMobile ? "100%" : undefined}
            style={{ cursor: "pointer" }}
            onClick={() => toggleClass(assetClass.name)}
          >
            <ActionIcon variant="transparent">
              {openClass === assetClass.name ? (
                <IconChevronUp size={18} color="white" />
              ) : (
                <IconChevronDown size={18} color="white" />
              )}
            </ActionIcon>
            <Text fz={"20px"} c="#FFF" fw={400} style={{ lineHeight: "150%" }}>
              {assetClass.name}
            </Text>
          </Flex>
          {openClass === assetClass.name && (
            <Box
              pl="lg"
              pb="sm"
              style={{ maxHeight: "200px", overflow: "auto" }}
            >
              {assetClass.items.map((item) => (
                <Text
                  key={item.id}
                  size="sm"
                  c="#B0B0B0"
                  py={3}
                  style={{ cursor: "pointer" }}
                  onClick={() => onAssetSelect(String(item.id), item.leverage)}
                >
                  {item.symbol}
                </Text>
              ))}
            </Box>
          )}
          {index < assetClasses.length - 1 && (
            <Divider color={BORDER_COLOR} my={2} />
          )}
        </Box>
      ))}
    </Box>
  );
}
