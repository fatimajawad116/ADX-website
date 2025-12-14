import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Menu, Text, Loader, ScrollArea, Divider } from "@mantine/core";
import { useTranslation } from "react-i18next";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const ASSETS_ENDPOINT = "/assets";
const ASSETS_URL = `${
  BASE_URL.endsWith("/api") ? BASE_URL : BASE_URL + "/api"
}${ASSETS_ENDPOINT}`;

// interface SymbolSelectorProps {
//   onAssetSelect: (symbol: string, leverage: string | number) => void;
//   currentSymbol: string;
// }

export default function SymbolSelector({ onAssetSelect, currentSymbol }) {
  const { t } = useTranslation();
  const ACTIVE_COLOR = "#FF9B42";
  const BORDER_COLOR = "#1A3E72";

  const {
    data: groupedAssets,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allAssetsForSelection"],
    queryFn: fetchAssets,
  });

  const assetClasses = groupedAssets ? transformAssetData(groupedAssets) : [];

  if (isLoading) {
    return (
      <Box
        p="sm"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader size="sm" color={ACTIVE_COLOR} />
        <Text c="#FFF" ml="sm" size="sm">
          {t("Loading assets...")}
        </Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p="sm">
        <Text c="red" size="sm">
          {t("Failed to load assets.")}
        </Text>
      </Box>
    );
  }

  return (
    <ScrollArea h={400} type="auto">
      <Box p="xs">
        {assetClasses.map((assetClass) => (
          <React.Fragment key={assetClass.name}>
            <Menu.Label
              style={{ color: ACTIVE_COLOR, fontWeight: 600, marginTop: "8px" }}
            >
              {assetClass.name}
            </Menu.Label>
            {assetClass.items.map((item) => (
              <Menu.Item
                key={item.id}
                onClick={() => onAssetSelect(item.symbol, item.leverage)}
                style={{
                  color:
                    item.symbol === currentSymbol ? ACTIVE_COLOR : "#CFCFCF",
                  backgroundColor:
                    item.symbol === currentSymbol
                      ? BORDER_COLOR
                      : "transparent",
                  borderRadius: "4px",
                  padding: "6px 10px",
                }}
              >
                {item.symbol}
              </Menu.Item>
            ))}

            <Divider color={BORDER_COLOR} my={4} />
          </React.Fragment>
        ))}
      </Box>
    </ScrollArea>
  );
}
