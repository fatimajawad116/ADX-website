import { Button, Flex, PasswordInput, Text, TextInput } from "@mantine/core";
import imageLogo from "../assets/imageLogo.png";
import { useNavigate } from "react-router-dom";
export default function LoginDashboard() {
  const navigate = useNavigate();
  const handlefogotPassowrd = () => {
    return navigate("/forgotpassword");
  };
  return (
    <Flex w={"100%"} h={"100vh"} bg={"#F4F6F5"}>
      <Flex
        w={"50%"}
        direction={"column"}
        justify={"flex-end"}
        gap={"45px"}
        style={{
          boxShadow: "4px 0 4px 0 rgba(0, 0, 0, 0.25)",
          borderTopRightRadius: "40px",
          borderBottomRightRadius: "40px",
        }}
        bg={"#0A1F44"}
        pl={"86px"}
      >
        <Text c="#FFF" size="48px" fw={"700"}>
          Manage Users trading operations efficiently with{" "}
          <span style={{ color: "#FF9B42" }}>ADX</span>.
        </Text>
        <Text c="#F8F8FC" fz={"32px"} fw={"500"}>
          Track operations, performance, and progress — all in one place
        </Text>
        <img src={imageLogo} alt="img-logo" width={"436px"} height={"230px"} />
      </Flex>
      <Flex
        flex={1}
        direction={"column"}
        style={{ padding: "140px 86px 0px 86px" }}
        gap={"35px"}
      >
        <Text c={"#0A1F44"} size="64px" fw={700}>
          Welcome Back !
        </Text>
        <Text
          c={"#0A1F44"}
          size="24px"
          fw={500}
          style={{ lineHeight: "28.747px" }}
        >
          Log in to continue using your account.
        </Text>
        <Flex direction={"column"}>
          <TextInput
            label="What’s your email?"
            placeholder="Enter your email address"
            required
            mb="40px"
            styles={{
              label: { color: "#A0A0A0", marginBottom: "10px" },
              input: {
                padding: "22px 12px",
                borderRadius: "12px",
                border: "1px solid #FF9B42",
                background: "none",
                color: "#A0A0A0",
                "&::placeholder": {
                  color: "#666",
                },
              },
            }}
          />
          <PasswordInput
            label="What's your password?"
            placeholder="Enter your password"
            required
            styles={{
              label: { color: "#A0A0A0", marginBottom: "10px" },
              input: {
                padding: "22px 12px",
                borderRadius: "12px",
                border: "1px solid #FF9B42",
                background: "none",
                color: "#A0A0A0",
                "&::placeholder": {
                  color: "#666",
                },
              },
            }}
            mb={"17.5px"}
          />

          <Text
            style={{
              display: "flex",
              justifyContent: "flex-end",
              cursor: "pointer",
            }}
            c={"#666"}
            size={"13px"}
            fw={"400"}
            onClick={handlefogotPassowrd}
          >
            Forgot your password?
          </Text>
        </Flex>
        <Button
          c={"#F8F9FB"}
          bg={"#0A1F44"}
          radius={"12px"}
          h={"60px"}
          w={"100%"}
        >
          <Text>Login</Text>
        </Button>
      </Flex>
    </Flex>
  );
}
