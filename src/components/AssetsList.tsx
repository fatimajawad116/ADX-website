import {
  Flex,
  Box,
  Text,
  ActionIcon,
  Divider,
  useMantineTheme,
} from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
const assetClasses = [
  { name: "Commodities", items: ["Gold", "Silver", "Oil"] },
  { name: "Indices", items: ["S&P 500", "NASDAQ", "DAX"] },
  { name: "Stocks", items: ["Apple", "Google", "Tesla"] },
  { name: "Cryptocurrencies", items: ["Bitcoin", "Ethereum", "Solana"] },
];

export default function AssetsList() {
  const [openClass, setOpenClass] = useState<string | null>(null);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const LIST_BG = "#0A1F44";
  const BORDER_COLOR = "#FF9B42";
  const toggleClass = (name: string) => {
    setOpenClass((current) => (current === name ? null : name));
  };
  return (
    <Box
      w={isMobile ? "100%" : "304px"}
      h={"563px"}
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
        style={{ borderBottom: `2px solid ${BORDER_COLOR}` }}
      >
        Asset Classes
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
            <Box pl="lg" pb="sm">
              {assetClass.items.map((item) => (
                <Text
                  key={item}
                  size="sm"
                  c="#B0B0B0"
                  py={3}
                  style={{ cursor: "pointer" }}
                >
                  {item}
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
