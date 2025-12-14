import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { ToastContainer } from "react-toastify";
import {
  Card,
  DirectionProvider,
  Flex,
  MantineProvider,
  type MantineThemeOverride,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { BrowserRouter, useRoutes } from "react-router-dom";
import LoaderCustom from "./components/Loader";
import { useTranslation } from "react-i18next";
import { routes } from "./routes/routes";
const createAppTheme = (
  colorScheme: "light" | "dark"
): MantineThemeOverride => ({
  colors: {
    myPrimary: [
      "#FEB6A3",
      "#FFD9CF",
      "#FFEBE5", // 2
      "#9BDABB", // 3
      "#CDEDDD", // 4 - base (primary)
      "#E2F6EC", // 5
      "#FFFDFC", // 6 - dark
      "#FAFAF8", // 7
      "#FAF6F5", // 8
      "#E4E2DD", // 9 - darkest
      "#B8B1A9", // 9 - darkest
      "#66615E", // 9 - darkest
      "#1A1615",
    ],
  },
  primaryColor: "myPrimary",
  primaryShade: { light: 4, dark: 6 },
  other: {
    primaryColor: "#0A1F44",
    secondaryColor: "#FF9B42",
    mainColorButtonActive: "#A5C8F2",
    mainColorButtonInActive: "#FCB98A",
    surfaceDefault: colorScheme === "dark" ? "#25262B" : "#FFFDFC",
    bgSubtle: colorScheme === "dark" ? "#25262B" : "#FFFF",
    bg: colorScheme === "dark" ? "#2C2E33" : "#FAF6F5",
    borderDefault: colorScheme === "dark" ? "#373A40" : "#E4E2DD",
    onSurfaceTertiary: colorScheme === "dark" ? "#909296" : "#B8B1A9",
    onSurfaceSecondary: colorScheme === "dark" ? "#C1C2C5" : "#66615E",
    onSurfacePrimary: colorScheme === "dark" ? "#FFFFFF" : "#2C2E33",
    PurpleHear: "#D9D9D9",
    calenderCard1: "#FFD9CF",
    calenderCard2: "#CDEDDD",
    calenderCardText1: "#1A1615",
    calenderCardText2: "#66615E",
  },
});
function AppContent() {
  const element = useRoutes(routes);
  const { i18n } = useTranslation();
  console.log("dir", i18n.languages);
  return (
    <>
      <LoaderCustom />
      {/* {!nonAuth && <SideBar />} */}
      <Flex h={"100%"} direction={"row"} justify={"flex-start"}>
        <Flex
          w={"100%"}
          direction={"column"}
          justify={"start"}
          align={"center"}
        >
          {/* {!nonAuth && <NavBar login={!nonAuth} />} */}
          <Card w={"100%"} p={"0px"} m={"0px"}>
            {element}
          </Card>
        </Flex>
        {/* {!nonAuth && i18n.language === "ar" && <SideBar />} */}
      </Flex>
    </>
  );
}
function App() {
  // const queryClient = new QueryClient({
  //   defaultOptions: {
  //     queries: { refetchOnWindowFocus: false, staleTime: 1000 * 60 * 2 },
  //   },
  // });
  const queryClient = new QueryClient();
  const theme = createAppTheme("light");
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <DirectionProvider>
        <MantineProvider theme={theme}>
          <Notifications />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </MantineProvider>
      </DirectionProvider>
    </QueryClientProvider>
  );
}

export default App;
