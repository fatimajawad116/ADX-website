import { Flex, Select, Textarea, TextInput } from "@mantine/core";
import classes from "./PaginationStyles.module.css";
interface WithdrawFieldsProps {
  paymentMethod: string | null;
  setPaymentMethod: (value: string | null) => void;
  showBankFields: boolean;
  showCurrencies: boolean;
  showCard: boolean;
  showOther: boolean;
  notes: string;
  bankName: string;
  accountHolder: string;
  setBankName: (value: string) => void;
  setAccountHolder: (value: string) => void;
  setNotes: (value: string) => void;
  setTransactionId: (value: string) => void;
  transactionId: string;
  currency: string;
  setCurrency: (value: string) => void;
  setWalletAddress: (value: string) => void;
  setCardNumber: (value: string) => void;
  setExpirationDate: (value: string) => void;
  setCardHolderName: (value: string) => void;
  setCvv: (value: string) => void;
  walletAddress: string;
  cardNumber: string;
  expirationDate: string;
  cardHolderName: string;
  cvv: string;
}
const paymentMethods = [
  { value: "Bank Transfer", label: "Bank Transfer" },
  { value: "Digital Currencies", label: "Digital Currencies" },
  { value: "Credit Card", label: "Credit Card" },
  { value: "Other", label: "Other" },
];
export default function DepositFields({
  paymentMethod,
  setPaymentMethod,
  showBankFields,
  showCurrencies,
  showCard,
  showOther,
  notes,
  setNotes,
  bankName,
  setBankName,
  accountHolder,
  setAccountHolder,
  transactionId,
  setTransactionId,
  currency,
  setCurrency,
  walletAddress,
  setWalletAddress,
  cardNumber,
  setCardNumber,
  expirationDate,
  setExpirationDate,
  cardHolderName,
  setCardHolderName,
  cvv,
  setCvv,
}: WithdrawFieldsProps) {
  return (
    <>
      <Flex
        direction={"column"}
        gap={"24px"}
        w={"100%"}
        align={"center"}
        justify={"center"}
      >
        <Select
          label="Payment Method"
          w={"100%"}
          placeholder="Select Payment Method"
          mb="10px"
          data={paymentMethods}
          value={paymentMethod}
          className="container"
          onChange={setPaymentMethod}
          classNames={{
            dropdown: classes.dropdown,
            option: classes.option,
          }}
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
            dropdown: {
              backgroundColor: "#0A1F44",
              border: "1px solid #FF9B42",
            },
            option: {
              color: "#FFFFFF",
              "&[data-selected]": {
                backgroundColor: "#FF9B42",
                color: "#0A1F44",
              },
              "&[data-hovered]": {
                backgroundColor: "#051227",
                color: "#FF9B42",
              },
            },
          }}
        />
      </Flex>
      {showBankFields && (
        <>
          <Flex
            direction={"column"}
            gap={"24px"}
            w={"100%"}
            align={"center"}
            justify={"center"}
          >
            <TextInput
              label="Bank Name"
              w={"100%"}
              placeholder="Enter The Bank Name"
              value={bankName}
              onChange={(event) => setBankName(event.currentTarget.value)}
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
          <Flex
            direction={"column"}
            gap={"24px"}
            w={"100%"}
            align={"center"}
            justify={"center"}
          >
            <TextInput
              label="Account Holder Name"
              w={"100%"}
              value={accountHolder}
              onChange={(event) => setAccountHolder(event.currentTarget.value)}
              placeholder="Enter The Account Holder Name"
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
          <Flex
            direction={"column"}
            gap={"24px"}
            w={"100%"}
            align={"center"}
            justify={"center"}
          >
            <TextInput
              label="Transaction ID / Reference Number"
              w={"100%"}
              value={transactionId}
              onChange={(event) => setTransactionId(event.currentTarget.value)}
              placeholder="Enter The Transaction ID "
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
        </>
      )}
      {showCurrencies && (
        <>
          <Flex
            direction={"column"}
            gap={"24px"}
            w={"100%"}
            align={"center"}
            justify={"center"}
          >
            <TextInput
              label="Currency Type"
              w={"100%"}
              value={currency}
              onChange={(event) => setCurrency(event.currentTarget.value)}
              placeholder="Enter The Currency Type"
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
          <Flex
            direction={"column"}
            gap={"24px"}
            w={"100%"}
            align={"center"}
            justify={"center"}
          >
            <TextInput
              label="Wallet Address"
              w={"100%"}
              value={walletAddress}
              onChange={(event) => setWalletAddress(event.currentTarget.value)}
              placeholder="Enter The Wallet Address"
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
          <Flex
            direction={"column"}
            gap={"24px"}
            w={"100%"}
            align={"center"}
            justify={"center"}
          >
            <TextInput
              label="Transaction ID"
              w={"100%"}
              value={transactionId}
              onChange={(event) => setTransactionId(event.currentTarget.value)}
              placeholder="Enter The Transaction ID"
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
        </>
      )}
      {showCard && (
        <>
          <Flex
            direction={"column"}
            gap={"24px"}
            w={"100%"}
            align={"center"}
            justify={"center"}
          >
            <TextInput
              label="Card Number"
              w={"100%"}
              value={cardNumber}
              onChange={(event) => setCardNumber(event.currentTarget.value)}
              placeholder="Enter The Card Number"
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
          <Flex
            direction={"column"}
            gap={"24px"}
            w={"100%"}
            align={"center"}
            justify={"center"}
          >
            <TextInput
              label="Expiration Date"
              w={"100%"}
              value={expirationDate}
              onChange={(event) => setExpirationDate(event.currentTarget.value)}
              placeholder="Enter The Expiration Date ‘’ DD/MM/YY ’’"
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
          <Flex
            direction={"column"}
            gap={"24px"}
            w={"100%"}
            align={"center"}
            justify={"center"}
          >
            <TextInput
              label="Cardholder Name"
              w={"100%"}
              value={cardHolderName}
              onChange={(event) => setCardHolderName(event.currentTarget.value)}
              placeholder="Enter The Cardholder Name"
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
          <Flex
            direction={"column"}
            gap={"24px"}
            w={"100%"}
            align={"center"}
            justify={"center"}
          >
            <TextInput
              label="CVV"
              w={"100%"}
              value={cvv}
              onChange={(event) => setCvv(event.currentTarget.value)}
              placeholder="Enter The CVV"
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
        </>
      )}
      {showOther && (
        <>
          <Flex
            direction={"column"}
            gap={"24px"}
            w={"100%"}
            align={"center"}
            justify={"center"}
          >
            <Textarea
              label="Notes"
              w={"100%"}
              value={notes}
              onChange={(event) => setNotes(event.currentTarget.value)}
              placeholder="Enter Your Notes"
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
        </>
      )}
    </>
  );
}
