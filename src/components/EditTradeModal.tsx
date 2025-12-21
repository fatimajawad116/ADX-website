import {
  Modal,
  TextInput,
  Flex,
  Text,
  Button,
  Loader,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useState } from "react";

interface EditTradeModalProps {
  opened: boolean;
  onClose: () => void;
  editData: {
    id: string;
    orderId: number;
    takeProfit: string;
    stopLoss: string;
  };
  setEditData: React.Dispatch<
    React.SetStateAction<{
      id: string;
      orderId: number;
      takeProfit: string;
      stopLoss: string;
    }>
  >;
  onConfirm: () => void;
  isUpdating: boolean;
}

export default function EditTradeModal({
  opened,
  onClose,
  editData,
  setEditData,
  onConfirm,
  isUpdating,
}: EditTradeModalProps) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [activeField, setActiveField] = useState<"tp" | "sl" | null>(null);
  const handleClose = () => {
    setActiveField(null);
    onClose();
  };

  const handleTPChange = (value: string) => {
    const newValue = value.trim();
    const isActive = newValue && newValue !== "0.00" && newValue !== "0";
    setEditData((prev) => {
      const newSL = isActive ? "0.00" : prev.stopLoss;
      if (!isActive && (newSL === "0.00" || newSL === "0" || newSL === "")) {
        setActiveField(null);
      } else if (isActive) {
        setActiveField("tp");
        return { ...prev, takeProfit: newValue, stopLoss: "0.00" };
      }
      return {
        ...prev,
        takeProfit: newValue,
        stopLoss: newSL,
      };
    });
  };

  const handleSLChange = (value: string) => {
    const newValue = value.trim();
    const isActive = newValue && newValue !== "0.00" && newValue !== "0";

    setEditData((prev) => {
      const newTP = isActive ? "0.00" : prev.takeProfit;
      if (!isActive && (newTP === "0.00" || newTP === "0" || newTP === "")) {
        setActiveField(null);
      } else if (isActive) {
        setActiveField("sl");
        return { ...prev, stopLoss: newValue, takeProfit: "0.00" };
      }
      return {
        ...prev,
        stopLoss: newValue,
        takeProfit: newTP,
      };
    });
  };
  const isTPDisabled = activeField === "sl";
  const isSLDisabled = activeField === "tp";
  const isConfirmDisabled =
    isUpdating ||
    !editData.takeProfit ||
    !editData.stopLoss ||
    (editData.takeProfit === "0" && editData.stopLoss === "0") ||
    (editData.takeProfit === "0.00" && editData.stopLoss === "0.00");
  return (
    <Modal
      w={"721px"}
      opened={opened}
      onClose={handleClose}
      withCloseButton={false}
      closeOnClickOutside={false}
      centered
      overlayProps={{
        backgroundOpacity: 0.85,
        blur: 1,
      }}
      styles={{
        content: {
          minWidth: isMobile ? "90vw" : "534px",
          maxWidth: isMobile ? "90vw" : "600px",
          width: "100%",
          height: isMobile ? "auto" : "60%",
          maxHeight: isMobile ? "90vh" : "900px",
          backgroundColor: "#0A1F44",
          border: "2px solid #FF9B42",
          borderRadius: "20px",
          padding: isMobile ? "20px 15px" : "20px 30px",
          boxShadow: "-6px 7px 4px #FF9B42",
          overflowY: "auto",
        },
        body: {
          paddingTop: "30px",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        },
      }}
    >
      <Flex direction="column" gap="xl" align="center">
        <Flex direction={"column"} gap={"20px"}>
          <Text
            c={"#FFF"}
            fz={"32px"}
            fw={"500"}
            lh={"100%"}
            style={{ textAlign: "center", fontFamily: "'Inter', sans-serif" }}
          >
            Edit Trade Settings
          </Text>
          <Flex gap="40px" w="100%" justify="space-between" pt={"20px"}>
            <TextInput
              label="Take Profit"
              placeholder="Enter take profit"
              fw={"400"}
              fz={"24px"}
              lh={"100%"}
              c={"#CFCFCF"}
              value={editData.takeProfit}
              type="number"
              onChange={(event) => handleTPChange(event.currentTarget.value)}
              disabled={isTPDisabled || isUpdating}
              styles={{
                input: {
                  width: "130px",
                  textAlign: "center",
                  height: "43px",
                  borderRadius: "12px",
                  boxShadow: "0px 1px 2px #FF9B42",
                  borderColor: "#FF9B42",
                  color: "white",
                  backgroundColor: isTPDisabled ? "#1A3358" : "#0A1F44",
                },
                label: {
                  textAlign: "center",
                  width: "100%",
                  marginBottom: "5px",
                  fontSize: "20px",
                },
              }}
            />
            <TextInput
              label="Stop Loss"
              fw={"400"}
              fz={"20px"}
              lh={"100%"}
              c={"#CFCFCF"}
              placeholder="Enter stop loss"
              value={editData.stopLoss}
              type="number"
              onChange={(event) => handleSLChange(event.currentTarget.value)}
              disabled={isSLDisabled || isUpdating}
              styles={{
                input: {
                  width: "130px",
                  textAlign: "center",
                  height: "43px",
                  borderRadius: "12px",
                  boxShadow: "0px 1px 2px #FF9B42",
                  borderColor: "#FF9B42",
                  color: "white",
                  backgroundColor: isSLDisabled ? "#1A3358" : "#0A1F44",
                },
                label: {
                  textAlign: "center",
                  width: "100%",
                  marginBottom: "5px",
                  fontSize: "20px",
                },
              }}
              style={{ flex: 1 }}
            />
          </Flex>
        </Flex>
        <Flex gap="40px" mt="xl" w="100%" justify="center">
          <Button
            onClick={onConfirm}
            w={"139px"}
            h={"55px"}
            radius={"20px"}
            size="md"
            fw={"400"}
            bg={"#0A1F44"}
            style={{
              border: "3px solid #FF9B42",
              fontFamily: "'Inter', sans-serif",
            }}
            c={"#F8F9FB"}
            disabled={isConfirmDisabled}
            leftSection={isUpdating ? <Loader size="xs" color="white" /> : null}
          >
            {isUpdating ? "Updating..." : "Confirm"}
          </Button>
          <Button
            onClick={handleClose}
            w={"139px"}
            h={"55px"}
            radius={"20px"}
            size="md"
            fw={"400"}
            bg={"#0A1F44"}
            style={{
              border: "3px solid #FF9B42",
              fontFamily: "'Inter', sans-serif",
            }}
            c={"#F8F9FB"}
            disabled={isUpdating}
          >
            Cancel
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
}
