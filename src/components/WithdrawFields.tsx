import { Flex, Select, Textarea, TextInput } from "@mantine/core";
import classes from "./PaginationStyles.module.css";
interface WithdrawFieldsProps {
  paymentMethod: string | null;
  setPaymentMethod: (value: string | null) => void;
  showBankFields: boolean;
  showCurrencies: boolean;
  showCard: boolean;
  showOther: boolean;
  bankName: string;
  setBankName: (value: string) => void;
  accountHolder: string;
  setAccountHolder: (value: string) => void;
  accountNumber: string;
  setAccountNumber: (value: string) => void;
  iban: string;
  setIban: (value: string) => void;
  swiftBicCode: string;
  setSwiftBicCode: (value: string) => void;
  wallet: string;
  setWallet: (value: string) => void;
  walletAddress: string;
  setWalletAddress: (value: string) => void;
  cardNumber: string;
  setCardNumber: (value: string) => void;
  expirationDate: string;
  setExpirationDate: (value: string) => void;
  cardHolderName: string;
  setCardHolderName: (value: string) => void;
  cvv: string;
  setCvv: (value: string) => void;
  notes: string;
  setNotes: (value: string) => void;
}

const paymentMethods = [
  { value: "Bank Transfer", label: "Bank Transfer" },
  { value: "Digital Currencies", label: "Digital Currencies" },
  { value: "Credit Card", label: "Credit Card" },
  { value: "Other", label: "Other" },
];

export default function WithdrawFields({
  paymentMethod,
  setPaymentMethod,
  showBankFields,
  showCurrencies,
  showCard,
  showOther,
  bankName,
  setBankName,
  accountHolder,
  setAccountHolder,
  accountNumber,
  setAccountNumber,
  iban,
  setIban,
  swiftBicCode,
  setSwiftBicCode,
  wallet,
  setWallet,
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
  notes,
  setNotes,
}: WithdrawFieldsProps) {
  const inputStyles = {
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
  };

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
              mb="10px"
              value={bankName}
              onChange={(event) => setBankName(event.currentTarget.value)}
              styles={inputStyles}
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
              placeholder="Enter The Account Holder Name"
              mb="10px"
              value={accountHolder}
              onChange={(event) => setAccountHolder(event.currentTarget.value)}
              styles={inputStyles}
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
              label="Account Number"
              w={"100%"}
              placeholder="Enter The Account Number"
              mb="10px"
              value={accountNumber}
              onChange={(event) => setAccountNumber(event.currentTarget.value)}
              styles={inputStyles}
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
              label="IBAN"
              w={"100%"}
              placeholder="Enter The IBAN"
              mb="10px"
              value={iban}
              onChange={(event) => setIban(event.currentTarget.value)}
              styles={inputStyles}
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
              label="SWIFT/BIC Code"
              w={"100%"}
              placeholder="Enter The SWIFT/BIC Code"
              mb="10px"
              value={swiftBicCode}
              onChange={(event) => setSwiftBicCode(event.currentTarget.value)}
              styles={inputStyles}
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
              label="Wallet"
              w={"100%"}
              placeholder="Enter The Wallet"
              mb="10px"
              value={wallet}
              onChange={(event) => setWallet(event.currentTarget.value)}
              styles={inputStyles}
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
              placeholder="Enter The Wallet Address"
              mb="10px"
              value={walletAddress}
              onChange={(event) => setWalletAddress(event.currentTarget.value)}
              styles={inputStyles}
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
              placeholder="Enter The Card Number"
              mb="10px"
              value={cardNumber}
              onChange={(event) => setCardNumber(event.currentTarget.value)}
              styles={inputStyles}
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
              placeholder="Enter The Expiration Date ‘’ DD/MM/YY ’’"
              mb="10px"
              value={expirationDate}
              onChange={(event) => setExpirationDate(event.currentTarget.value)}
              styles={inputStyles}
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
              placeholder="Enter The Cardholder Name"
              mb="10px"
              value={cardHolderName}
              onChange={(event) => setCardHolderName(event.currentTarget.value)}
              styles={inputStyles}
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
              placeholder="Enter The CVV"
              mb="10px"
              value={cvv}
              onChange={(event) => setCvv(event.currentTarget.value)}
              styles={inputStyles}
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
              placeholder="Enter Your Notes"
              mb="10px"
              value={notes}
              onChange={(event) => setNotes(event.currentTarget.value)}
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
