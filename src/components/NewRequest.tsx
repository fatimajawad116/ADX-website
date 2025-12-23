import {
  Button,
  Flex,
  Loader,
  Modal,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import DepositFields from "./DepositFields";
import WithdrawFields from "./WithdrawFields";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const REQUEST_ENDPOINT = "/transactions/process";
const REQUEST_URL = `${
  BASE_URL.endsWith("/api") ? BASE_URL : BASE_URL + "/api"
}${REQUEST_ENDPOINT}`;
interface NewRequestProps {
  opened: boolean;
  onClose: () => void;
}
export default function NewRequest({ opened, onClose }: NewRequestProps) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const resetFormStates = () => {
    setIsDeposit(true);
    setPaymentMethod("Bank Transfer");
    setAmount("");
    setNotes("");
    setError(null);
    setIsLoading(false);
    setBankName("");
    setAccountHolder("");
    setTransactionId("");
    setAccountNumber("");
    setIban("");
    setSwiftBicCode("");
    setWallet("");
    setWalletAddress("");
    setCardNumber("");
    setExpirationDate("");
    setCardHolderName("");
    setCvv("");
    setCurrency("");
  };
  const handleClose = () => {
    resetFormStates();
    onClose();
  };
  const [isDeposit, setIsDeposit] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(
    "bank_transfer"
  );
  const [amount, setAmount] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");
  const [accountHolder, setAccountHolder] = useState<string>("");
  const [transactionId, setTransactionId] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [iban, setIban] = useState<string>("");
  const [swiftBicCode, setSwiftBicCode] = useState<string>("");
  const [wallet, setWallet] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [cardHolderName, setCardHolderName] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const showBankFields = paymentMethod === "Bank Transfer";
  const showCard = paymentMethod === "Credit Card";
  const showOther = paymentMethod === "Other";
  const showCurrencies = paymentMethod === "Digital Currencies";
  const depositButtonStyles = isDeposit
    ? {
        c: "#F8F8FC",
        bg: "#0A1F44",
        style: { border: "1px solid #FF9B42", borderRadius: "12px" },
      }
    : {
        c: "#0A1F44",
        bg: "#FFFFFF",
        style: { fontFamily: "'Inter', sans-serif", borderRadius: "12px" },
      };

  const withdrawButtonStyles = isDeposit
    ? {
        c: "#0A1F44",
        bg: "#FFFFFF",
        style: { fontFamily: "'Inter', sans-serif", borderRadius: "12px" },
      }
    : {
        c: "#F8F8FC",
        bg: "#0A1F44",
        style: { border: "1px solid #FF9B42", borderRadius: "12px" },
      };
  const formatPaymentMethod = (method: string | null): string => {
    if (!method) return "unknown";
    return method
      .replace(/_/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  };
  const handleSubmit = async () => {
    setError(null);
    setIsLoading(true);

    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      setError("Authentication token not found. Please log in.");
      setIsLoading(false);
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError("Please enter a valid amount.");
      setIsLoading(false);
      return;
    }
    let details: Record<string, string> = {};
    if (paymentMethod === "Bank Transfer") {
      details = {
        bank_name: bankName,
        account_holder: accountHolder,
        transaction_id: transactionId,
        account_number: accountNumber,
        iban: iban,
        swift: swiftBicCode,
      };
    } else if (paymentMethod === "Digital Currencies") {
      details = {
        currency_type: currency,
        transaction_id: transactionId,
        wallet: wallet,
        wallet_address: walletAddress,
      };
    } else if (paymentMethod === "Credit Card") {
      details = {
        card_number: cardNumber,
        expiration_date: expirationDate,
        cardholder_name: cardHolderName,
        cvv: cvv,
      };
    } else if (paymentMethod === "Other") {
      details = {
        notes: notes,
      };
    }
    const transactionType = isDeposit ? "Deposit" : "Withdrawal";
    const requestBody = {
      amount: numericAmount,
      method: formatPaymentMethod(paymentMethod),
      details: details,
      transaction_type: isDeposit ? "deposit" : "withdraw",
    };
    console.log("البيانات المرسلة:", requestBody);
    try {
      const response = await fetch(REQUEST_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Failed to process request" }));
        throw new Error(
          errorData.message || `Request failed with status: ${response.status}`
        );
      }
      notifications.show({
        title: `${transactionType} Successful!`,
        message: `${transactionType} request submitted successfully. It is now being processed.`,
        color: "green",
        icon: <IconCheck />,
        autoClose: 5000,
      });
      handleClose();
    } catch (err) {
      console.error("Save error:", err);
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      notifications.show({
        title: `${transactionType} Failed`,
        message: `Failed to process ${transactionType} request: ${errorMessage}`,
        color: "red",
        icon: <IconX />,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      withCloseButton={false}
      centered
      overlayProps={{
        backgroundOpacity: 0.92,
        blur: 1,
      }}
      styles={{
        content: {
          minWidth: isMobile ? "90vw" : "534px",
          maxWidth: isMobile ? "90vw" : "600px",
          width: "100%",
          height: isMobile ? "auto" : "100%",
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
      <Text
        fw={"600"}
        fz={"20px"}
        style={{ fontFamily: "'Inter', sans-serif" }}
        c={"#FFFFFF"}
        lh={"150%"}
      >
        New Request
      </Text>
      <Flex bg={"#FF9B42"} h={"1px"} mt={"10px"}></Flex>
      <Flex
        w={"100%"}
        justify={"center"}
        align={"center"}
        direction={"column"}
        gap={"10px"}
      >
        <Flex
          bg={"#FFFFFF"}
          w={"230px"}
          style={{
            fontFamily: "'Inter', sans-serif",
            border: "1px solid #FF9B42",
            borderRadius: "12px",
          }}
          mt={"30px"}
          justify={"space-between"}
        >
          <Button
            fw={"400"}
            fz={"16px"}
            lh={"150%"}
            h={"100%"}
            px={"8px"}
            py={"8px"}
            w={"50%"}
            onClick={() => setIsDeposit(true)}
            {...depositButtonStyles}
          >
            Deposit
          </Button>
          <Button
            fw={"400"}
            fz={"16px"}
            lh={"150%"}
            h={"100%"}
            px={"8px"}
            py={"8px"}
            flex={"1"}
            onClick={() => setIsDeposit(false)}
            {...withdrawButtonStyles}
          >
            Withdraw
          </Button>
        </Flex>
        <Flex
          direction={"column"}
          gap={"24px"}
          w={"100%"}
          align={"center"}
          justify={"center"}
        >
          <TextInput
            label="Amount"
            w={"100%"}
            placeholder="Enter amount in USD"
            value={amount}
            onChange={(event) => setAmount(event.currentTarget.value)}
            mb="10px"
            styles={{
              label: {
                color: "#CFCFCF",
                marginBottom: "10px",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "400",
                fontSize: "15px",
                paddingLeft: "10px",
              },
              input: {
                padding: "22px 16px",
                borderRadius: "12px",
                border: "1px solid #FF9B42",
                background: "none",
                color: "#FFFFFF",
                "&::placeholder": {
                  color: "#666",
                },
              },
            }}
          />
        </Flex>
        {isDeposit ? (
          <DepositFields
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            showBankFields={showBankFields}
            showCurrencies={showCurrencies}
            showCard={showCard}
            showOther={showOther}
            notes={notes} // مرر القيمة
            setNotes={setNotes}
            bankName={bankName}
            setBankName={setBankName}
            accountHolder={accountHolder}
            setAccountHolder={setAccountHolder}
            setTransactionId={setTransactionId}
            transactionId={transactionId}
            walletAddress={walletAddress}
            setWalletAddress={setWalletAddress}
            currency={currency}
            setCurrency={setCurrency}
            cvv={cvv}
            setCvv={setCvv}
            cardHolderName={cardHolderName}
            setCardHolderName={setCardHolderName}
            expirationDate={expirationDate}
            setExpirationDate={setExpirationDate}
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
          />
        ) : (
          <WithdrawFields
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            showBankFields={showBankFields}
            showCurrencies={showCurrencies}
            showCard={showCard}
            showOther={showOther}
            // حقول السحب
            bankName={bankName}
            setBankName={setBankName}
            accountHolder={accountHolder}
            setAccountHolder={setAccountHolder}
            accountNumber={accountNumber}
            setAccountNumber={setAccountNumber}
            iban={iban}
            setIban={setIban}
            swiftBicCode={swiftBicCode}
            setSwiftBicCode={setSwiftBicCode}
            wallet={wallet}
            setWallet={setWallet}
            walletAddress={walletAddress}
            setWalletAddress={setWalletAddress}
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            expirationDate={expirationDate}
            setExpirationDate={setExpirationDate}
            cardHolderName={cardHolderName}
            setCardHolderName={setCardHolderName}
            cvv={cvv}
            setCvv={setCvv}
            notes={notes}
            setNotes={setNotes}
          />
        )}
        {error && (
          <Text c="red" mt="10px" style={{ fontFamily: "Poppins, sans-serif" }}>
            Error: {error}
          </Text>
        )}
        <Flex
          w={"100%"}
          justify={"center"}
          align={"center"}
          gap={"20px"}
          mt={"30px"}
        >
          <Button
            w="139px"
            size="lg"
            bg={"#0A1F44"}
            radius="20px"
            c={"#F8F9FB"}
            style={{ border: "3px solid #FF9B42" }}
            px={"8px"}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? <Loader size="sm" color="white" /> : "Submit"}
          </Button>
          <Button
            w="139px"
            size="lg"
            bg={"#0A1F44"}
            radius="20px"
            c={"#F8F9FB"}
            style={{ border: "3px solid #FF9B42" }}
            px={"8px"}
            disabled={isLoading}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
}
