import { Flex } from "@mantine/core";
import HeaderMain from "../components/HeaderMain";
import MyWallet from "../components/MyWallet";
import Transactions from "../components/Transactions";

export default function Wallet () {

    return(
        <Flex direction={"column"} gap={"30px"} h={"100%"}>
        <HeaderMain />
        <MyWallet />
        <Transactions />
        </Flex>
    )
}