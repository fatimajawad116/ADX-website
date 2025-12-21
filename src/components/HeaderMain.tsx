import {
  Flex,
  Text,
  Box,
  Burger,
  Drawer,
  useMantineTheme,
  Select,
} from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import logo from "../assets/ADXLOGO.png";
import iconUser from "../assets/frame.svg";
import Profile from "./Profile";
import { useTranslation } from "react-i18next";
import {
  IconChevronDown,
  IconChevronUp,
  IconLogout,
  IconUserEdit,
} from "@tabler/icons-react";
type Language = "en" | "ar";
const COLORS = {
  background: "#0A1F44",
  text: "#E0E0E0",
  buttonBorder: "#FF9B42",
  hoverText: "#FFFFFF",
  activeLink: "#FF9B42",
};
export default function HeaderMain() {
  const [isProfile, { open: openProfile, close: closeProfile }] =
    useDisclosure(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const theme = useMantineTheme();
  const navItems = [
    { label: t("Markets"), path: "/mainpage" },
    { label: t("Deals"), path: "/deals" },
    { label: t("Wallet"), path: "/wallet" },
    { label: t("Contact us"), path: "/contact-us" },
  ];
  const [isOpened, setIsOpened] = useState(false);
  const dropdownIcon = isOpened ? (
    <IconChevronUp size={16} color="#FFFFFF" />
  ) : (
    <IconChevronDown size={16} color="#FFFFFF" />
  );
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("EN");
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const NavLinks = ({ onClick = () => {} }) => (
    <Flex
      direction={isMobile ? "column" : "row"}
      mt={isMobile ? "30px" : undefined}
      align="center"
      justify="space-between"
      w={isMobile ? "100%" : ""}
      gap={isMobile ? "xl" : "48px"}
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            to={item.path}
            style={{
              paddingLeft: isMobile ? "20px" : undefined,
              textDecoration: "none",
              color: isActive
                ? COLORS.activeLink
                : isMobile
                ? COLORS.background
                : COLORS.text,
              fontSize: "16px",
              cursor: "pointer",
              borderBottom: isMobile
                ? `1px solid ${COLORS.buttonBorder}`
                : "none",
              paddingBottom: isMobile ? "8px" : "0",
              width: isMobile ? "100%" : "auto",
              textAlign: isMobile ? "left" : "center",
            }}
            key={item.label}
            onClick={onClick}
          >
            {item.label}
          </Link>
        );
      })}
    </Flex>
  );
  const toggleLanguage = () => {
    const newLang = currentLanguage === "EN" ? "AR" : "EN";
    i18n.changeLanguage(newLang.toLowerCase() as Language);
    setCurrentLanguage(newLang);
    setDrawerOpened(false);
  };
  return (
    <>
      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        padding="10px"
        size="100%"
        h={"100%"}
        styles={{
          header: {
            backgroundColor: COLORS.background,
            borderTopRightRadius: "5px",
          },
          content: {
            backgroundColor: "#FFFFFF",
            boxShadow: "6px 7px 4px 0 rgba(0, 0, 0, 0.25)",
          },
          body: {
            backgroundColor: "#FFFFFF",
          },
        }}
        title={
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              paddingLeft: "16px",
            }}
          >
            <img
              src={logo}
              alt="ADX logo"
              style={{ height: "40px", width: "76px" }}
            />
          </Box>
        }
      >
        <NavLinks onClick={() => setDrawerOpened(false)} />

        <Flex direction="column" gap="xl" mt="xl">
          <Flex
            align="center"
            onClick={toggleLanguage}
            style={{
              fontSize: "16px",
              color: COLORS.background,
              paddingLeft: "20px",
              cursor: "pointer",
              borderBottom: `1px solid ${COLORS.buttonBorder}`,
              paddingBottom: "8px",
              width: "100%",
              textAlign: "left",
              textDecoration: "none",
            }}
          >
            <Flex
              w={"40px"}
              h={"40px"}
              align="center"
              justify="center"
              style={{ cursor: "pointer", paddingLeft: "20px" }}
              onClick={openProfile}
            >
              <IconUserEdit />
            </Flex>
            <Text
              size="md"
              c={COLORS.background}
              style={{ fontWeight: "bold" }}
            >
              {currentLanguage}
            </Text>
            <Text
              size="md"
              c="#C0C0C0"
              style={{ marginLeft: "4px", marginRight: "4px" }}
            >
              /
            </Text>
            <Text
              size="md"
              c={currentLanguage === "AR" ? COLORS.activeLink : "#C0C0C0"}
            >
              {currentLanguage === "EN" ? "AR" : "EN"}
            </Text>
          </Flex>
        </Flex>
      </Drawer>
      <Flex
        bg={COLORS.background}
        align="center"
        justify="space-between"
        px="40px"
        py="md"
        style={{ height: 60 }}
      >
        <Flex
          align="center"
          justify={isMobile ? "space-between" : undefined}
          w={isMobile ? "100%" : undefined}
        >
          {isMobile && (
            <Burger
              opened={drawerOpened}
              onClick={() => setDrawerOpened((o) => !o)}
              color={COLORS.text}
              size="sm"
              mr="md"
            />
          )}
          <Box>
            <img
              src={logo}
              alt="ADX logo"
              style={{
                height: "52px",
                width: "99px",
                display: "block",
                marginLeft: isMobile ? "0" : "  0px",
              }}
            />
          </Box>
        </Flex>
        {!isMobile && <NavLinks />}
        <Flex align="center" gap="xl">
          {!isMobile && <></>}
          {!isMobile && (
            <Flex align={"center"} gap={"10px"}>
              <Select
                data={[
                  { value: "en", label: "English" },
                  { value: "ar", label: "العربية" },
                ]}
                value={i18n.language}
                // onChange={changeLanguage}
                onChange={(value) => {
                  i18n.changeLanguage(value as Language);
                  setCurrentLanguage(value === "en" ? "EN" : "AR");
                  setDrawerOpened(false);
                }}
                w={95}
                size="sm"
                styles={{
                  input: {
                    color: "#FFFFFF",
                    borderColor: "transparent",
                    backgroundColor: "transparent",
                  },
                }}
                onDropdownOpen={() => setIsOpened(true)}
                onDropdownClose={() => setIsOpened(false)}
                rightSection={dropdownIcon}
              />
              <Flex w={"31px"} h={"30px"}>
                <img
                  src={iconUser}
                  alt="icon-profile"
                  width={"100%"}
                  height={"100%"}
                  style={{ cursor: "pointer" }}
                  onClick={openProfile}
                />
              </Flex>
              <IconLogout
                title="logout"
                size={24}
                color="#FF9B42"
                style={{
                  cursor: "pointer",
                  marginLeft: "8px",
                }}
                onClick={() => {
                  localStorage.removeItem("authToken");
                  window.location.href = "/";
                }}
              />
            </Flex>
          )}
        </Flex>
      </Flex>
      <Profile opened={isProfile} onClose={closeProfile} account_id="" />
    </>
  );
}
