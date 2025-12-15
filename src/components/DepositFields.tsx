import { Flex, Select, Textarea, TextInput } from "@mantine/core";
import classes from "./PaginationStyles.module.css";
interface WithdrawFieldsProps {
  paymentMethod: string | null;
  setPaymentMethod: (value: string | null) => void;
  showBankFields: boolean;
  showCurrencies: boolean;
  showCard: boolean;
  showOther: boolean;
}
const paymentMethods = [
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "currencies", label: "Digital Currencies" },
  { value: "card", label: "Credit Card" },
  { value: "other", label: "Other" },
];
export default function DepositFields({
  paymentMethod,
  setPaymentMethod,
  showBankFields,
  showCurrencies,
  showCard,
  showOther,
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
