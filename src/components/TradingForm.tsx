import { Box, Button, Flex, Text, Select, rem } from "@mantine/core";
import classes from "./PaginationStyles.module.css"; // تأكد من أن مسار هذا الملف صحيح
import React from "react";
import { useTranslation } from "react-i18next";
interface TradingFormProps {
  assetSymbol: string;
  buyPrice: string;
  sellPrice: string;
  lotsValue: number;
  leverage: string;
  orderType: string;
  pendingOrder: string;
  takeProfit: string;
  stopLoss: string;
  marginCost: string;
  isMobile: boolean;
  isStopLossDisabled: boolean;
  isTakeProfitDisabled: boolean;
  incrementLots: () => void;
  decrementLots: () => void;
  formatLots: (value: number) => string;
  setOrderType: (value: string | null) => void;
  handleInputChange: (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => void;
  handleSubmitOrder: (orderSide: "buy" | "sell") => Promise<void>;
  setPendingOrder: React.Dispatch<React.SetStateAction<string>>;
  setTakeProfit: React.Dispatch<React.SetStateAction<string>>;
  setStopLoss: React.Dispatch<React.SetStateAction<string>>;
  setLeverage: React.Dispatch<React.SetStateAction<string>>;
}

const data = [
  { value: "buy", label: "Buy" },
  { value: "sell", label: "Sell" },
  { value: "buy_limit", label: "Buy Limit" },
  { value: "sell_limit", label: "Sell Limit" },
  { value: "buy_stop", label: "Buy Stop" },
  { value: "sell_stop", label: "Sell Stop" },
];

const TradingInput = ({
  label,
  value,
  isSelect = false,
  isCounter = false,
  onIncrement,
  onDecrement,
  onChange,
  isDisabled = false,
  isTextInput = false,
  marginCostValue,
  assetSymbol,
}: {
  label: string;
  value: string;
  isSelect?: boolean;
  options?: string[];
  isCounter?: boolean;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onChange?: (value: string) => void;
  isDisabled?: boolean;
  isTextInput?: boolean;
  marginCostValue?: string;
  assetSymbol?: string;
}) => (
  <Flex gap={"5px"} direction={"column"} w="100%">
    <Text c={"#CFCFCF"} fz={"16px"} fw={"400"}>
      {label}
    </Text>
    {isSelect ? (
      <Select
        value={value}
        data={data}
        onChange={
          onChange as (
            value: string | null,
            item: { value: string; label: string }
          ) => void
        }
        defaultValue={value}
        h={"43px"}
        w={"100%"}
        radius={"12px"}
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
            fontSize: "16px",
            fontWeight: 400,
            height: "46px",
            textAlign: "center",
            paddingLeft: "0",
            paddingRight: "30px",
            cursor: "pointer",
            boxShadow: "0 1px 2px 0 #FFF",
            "&:focus, &:focus-within": {
              outline: "none",
              borderColor: "#FF9B42",
            },
          },
        }}
      />
    ) : isCounter ? (
      <Box>
        <Flex
          align="center"
          justify="space-between"
          w={"160px"}
          h={"43px"}
          style={{
            border: "1px solid #FF9B42",
            boxShadow: "0 1px 2px 0 #FFF",
            backgroundColor: "#0A1F44",
            padding: "0 5px",
            borderRadius: "12px",
          }}
        >
          <Button
            onClick={onDecrement}
            h={rem(35)}
            w={rem(35)}
            radius={"8px"}
            bg="#0A1F44"
            c="#FF9B42"
            fz={"20px"}
            fw={"600"}
            style={{ padding: 0 }}
            disabled={parseFloat(value) <= 0.1}
          >
            -
          </Button>
          <Text c={"#FFF"} fz={"16px"} fw={"400"}>
            {value}
          </Text>
          <Button
            onClick={onIncrement}
            h={rem(35)}
            w={rem(35)}
            radius={"8px"}
            bg="#0A1F44"
            c="#FF9B42"
            fz={"20px"}
            fw={"600"}
            style={{ padding: 0 }}
          >
            +
          </Button>
        </Flex>
        {marginCostValue && assetSymbol && (
          <Text
            c={"#FF9B42"}
            fz={"12px"}
            fw={"400"}
            w={"200px"}
            mt="9px"
            lh={"100%"}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {value} Lot of {assetSymbol} = {marginCostValue} $
          </Text>
        )}
      </Box>
    ) : isTextInput ? (
      <input
        value={value}
        onChange={(event) => onChange && onChange(event.currentTarget.value)}
        disabled={isDisabled}
        type="text"
        placeholder="0"
        style={{
          width: "100%",
          height: "43px",
          borderRadius: "12px",
          border: "1px solid #FF9B42",
          boxShadow: "0 1px 2px 0 #FFF",
          backgroundColor: "#0A1F44",
          color: "#FFF",
          textAlign: "center",
          padding: "0 10px",
          fontSize: "16px",
          fontWeight: "400",
          outline: "none",
        }}
      />
    ) : (
      <Button
        w={"100%"}
        h={"43px"}
        radius={"12px"}
        style={{ border: "1px solid #FF9B42", boxShadow: "0 1px 2px 0 #FFF" }}
        bg={"#0A1F44"}
        c={"#FFF"}
        fz={"16px"}
        fw={"400"}
      >
        {value}
      </Button>
    )}
  </Flex>
);

const TradingForm: React.FC<TradingFormProps> = ({
  assetSymbol,
  buyPrice,
  sellPrice,
  lotsValue,
  leverage,
  orderType,
  pendingOrder,
  takeProfit,
  stopLoss,
  marginCost,
  isStopLossDisabled,
  isTakeProfitDisabled,
  incrementLots,
  decrementLots,
  formatLots,
  setOrderType,
  handleInputChange,
  handleSubmitOrder,
  setPendingOrder,
  setTakeProfit,
  setStopLoss,
  setLeverage,
}) => {
  const [baseAsset, quoteAsset] = assetSymbol.includes("/")
    ? assetSymbol.split("/")
    : [assetSymbol, ""];
  const { t } = useTranslation();
  return (
    <>
      {/* ---------------------------------------------------- */}
      {/* View for Large Screens (visibleFrom="sm") */}
      {/* ---------------------------------------------------- */}
      <Flex justify="center" py={"20px"}>
        <Flex
          mx={"65px"}
          py={"30px"}
          style={{ borderRadius: "20px", overflowX: "auto" }}
          bg={"#0A1F44"}
          align="center"
          justify="space-around"
          visibleFrom="sm"
          w={"100%"}
        >
          <Flex
            direction={"column"}
            gap={"40px"}
            mr="40px"
            style={{ minWidth: "150px" }}
          >
            <Flex>
              <Text c={"#FF9B42"} fz={"24px"} fw={"400"}>
                {baseAsset}
              </Text>
              <Text c={"#666"} fz={"24px"} fw={"400"}>
                {quoteAsset ? `/${quoteAsset}` : ""}
              </Text>
            </Flex>
            <Flex direction={"column"} gap={"10px"}>
              <Text
                c={"#FFF"}
                fz={"22px"}
                fw={"400"}
                style={{ lineHeight: "150%" }}
              >
                {t("Sell")} : {sellPrice}
              </Text>
              <Text
                c={"#FFF"}
                fz={"22px"}
                fw={"400"}
                style={{ lineHeight: "150%" }}
              >
                {t("Buy")} : {buyPrice}
              </Text>
            </Flex>
          </Flex>
          <Flex gap={"20px"} align="center" justify={"space-between"} w={"50%"}>
            <Flex
              direction={"column"}
              gap={"5px"}
              align="flex-start"
              w={"130px"}
            >
              <TradingInput
                label={t("Lots")}
                value={formatLots(lotsValue)}
                isCounter
                onIncrement={incrementLots}
                onDecrement={decrementLots}
                marginCostValue={marginCost}
                assetSymbol={assetSymbol}
              />
              <TradingInput
                label={t("Leverage")}
                value={leverage}
                isTextInput
                isDisabled
                onChange={(v) => handleInputChange(setLeverage, v)}
              />
            </Flex>
            <Flex direction={"column"} gap={"20px"} align="flex-start">
              <TradingInput
                label={t("Order Type")}
                value={orderType || "optional"}
                isSelect
                onChange={setOrderType}
              />
              <TradingInput
                label={t("Pending Order")}
                value={pendingOrder}
                isTextInput
                onChange={(v) => handleInputChange(setPendingOrder, v)}
              />
            </Flex>
            <Flex
              direction={"column"}
              gap={"20px"}
              align="flex-start"
              w={"130px"}
            >
              <TradingInput
                label={t("Take Profit")}
                value={takeProfit}
                isTextInput
                isDisabled={isTakeProfitDisabled}
                onChange={(v) => handleInputChange(setTakeProfit, v)}
              />

              <TradingInput
                label={t("Stop Loss")}
                value={stopLoss}
                isTextInput
                isDisabled={isStopLossDisabled}
                onChange={(v) => handleInputChange(setStopLoss, v)}
              />
            </Flex>
          </Flex>
          <Flex
            direction={"column"}
            gap={"40px"}
            ml="40px"
            style={{ minWidth: "100px" }}
          >
            <Button
              radius={"12px"}
              style={{ border: "3px solid #FF9B42" }}
              w={"139px"}
              h={"55px"}
              c={"#F8F9FB"}
              bg={"#0A1F44"}
              fz={"36px"}
              fw={"600"}
              onClick={() => handleSubmitOrder("buy")}
            >
              {t("Buy")}
            </Button>

            <Button
              radius={"12px"}
              style={{ border: "3px solid #FF9B42" }}
              w={"139px"}
              h={"55px"}
              c={"#F8F9FB"}
              bg={"#0A1F44"}
              fz={"36px"}
              fw={"600"}
              onClick={() => handleSubmitOrder("sell")}
            >
              {t("Sell")}
            </Button>
          </Flex>
        </Flex>
      </Flex>

      {/* ---------------------------------------------------- */}
      {/* View for Small Screens (hiddenFrom="sm") */}
      {/* ---------------------------------------------------- */}
      <Flex px={"20px"}>
        <Flex
          mb={"20px"}
          direction={"column"}
          gap={"20px"}
          p={"20px"}
          bg={"#0A1F44"}
          w={"100%"}
          style={{ borderRadius: "8px" }}
          hiddenFrom="sm"
        >
          <Flex justify="space-between" align="center">
            <Flex>
              <Text c={"#FF9B42"} fz={"32px"} fw={"400"}>
                {baseAsset}
              </Text>
              <Text c={"#666"} fz={"32px"} fw={"400"}>
                {quoteAsset ? `/${quoteAsset}` : ""}
              </Text>
            </Flex>
          </Flex>
          <Flex
            justify="space-between"
            px={"30px"}
            align="center"
            style={{ width: "100%" }}
          >
            <Flex direction="column" align="center" justify={"space-around"}>
              <Text c={"#CFCFCF"} fz={"24px"} fw={"400"}>
                Sell:
              </Text>

              <Text c={"#FFF"} fz={"24px"} fw={"400"}>
                {sellPrice}
              </Text>
            </Flex>
            <Flex direction="column" align="center">
              <Text c={"#CFCFCF"} fz={"24px"} fw={"400"}>
                Buy:
              </Text>
              <Text c={"#FFF"} fz={"24px"} fw={"400"}>
                {buyPrice}
              </Text>
            </Flex>
          </Flex>
          <Flex direction="column" gap="10px" style={{ width: "100%" }}>
            <Flex gap="10px">
              <Box w="100%">
                <TradingInput
                  label="Lots"
                  value={formatLots(lotsValue)}
                  isCounter
                  onIncrement={incrementLots}
                  onDecrement={decrementLots}
                />
              </Box>
              <Box w="100%">
                <TradingInput
                  label="Leverage"
                  value={leverage}
                  isTextInput
                  onChange={(v) => handleInputChange(setLeverage, v)}
                />
              </Box>
            </Flex>
            <Flex gap="10px">
              <Box w="50%">
                <TradingInput
                  label="Order Type"
                  value={orderType || "optional"}
                  isSelect
                  onChange={setOrderType}
                />
              </Box>
              <Box w="50%">
                <TradingInput
                  label="Pending Order"
                  value={pendingOrder}
                  isTextInput
                  onChange={(v) => handleInputChange(setPendingOrder, v)}
                />
              </Box>
            </Flex>
            <Flex gap="10px">
              <Box w="50%">
                <TradingInput
                  label="Take Profit"
                  value={takeProfit}
                  isTextInput
                  isDisabled={isTakeProfitDisabled}
                  onChange={(v) => handleInputChange(setTakeProfit, v)}
                />
              </Box>
              <Box w="50%">
                <TradingInput
                  label="Stop Loss"
                  value={stopLoss}
                  isTextInput
                  isDisabled={isStopLossDisabled}
                  onChange={(v) => handleInputChange(setStopLoss, v)}
                />
              </Box>
            </Flex>
          </Flex>
          <Flex gap={"20px"} justify={"space-between"} mt="20px">
            <Button
              radius={"12px"}
              style={{ border: "3px solid #FF9B42" }}
              w={"139px"}
              h={"55px"}
              c={"#FFF"}
              bg={"none"}
              fz={"24px"}
              fw={"600"}
              onClick={() => handleSubmitOrder("buy")}
            >
              Buy
            </Button>
            <Button
              radius={"12px"}
              style={{ border: "3px solid #FF9B42" }}
              w={"139px"}
              h={"55px"}
              c={"#FFF"}
              bg={"none"}
              fz={"24px"}
              fw={"600"}
              onClick={() => handleSubmitOrder("sell")}
            >
              {" "}
              Sell
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default TradingForm;
