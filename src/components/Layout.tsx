import { Flex } from "@mantine/core";
import HeaderMain from "./HeaderMain";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

export default function Layout() {
    return(
        <>
        <Flex direction={"column"}>
            <HeaderMain />
            <Outlet />
            <Footer />
        </Flex>
        </>
    )
}