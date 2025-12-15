import {
  Flex,
  Text,
  Button,
  Box,
  Anchor,
  Burger,
  Drawer,
  useMantineTheme,
  Select,
} from "@mantine/core";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import logo from "../assets/ADXLOGO.png";
import { useTranslation } from "react-i18next";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
type Language = "en" | "ar";
const COLORS = {
  background: "#0A1F44",
  text: "#E0E0E0",
  buttonBorder: "#FF9B42",
  hoverText: "#FFFFFF",
  activeLink: "#FF9B42",
};
export default function Header() {
  const { i18n, t } = useTranslation();
  const navItems = [
    { label: t("Home"), path: "/" },
    { label: t("Price"), path: "/price" },
    { label: t("About"), path: "/about" },
    { label: t("Contact us"), path: "/contactUs" },
  ];
  const navigate = useNavigate();
  const [isOpened, setIsOpened] = useState(false);
  const dropdownIcon = isOpened ? (
    <IconChevronUp size={16} color="#FFFFFF" />
  ) : (
    <IconChevronDown size={16} color="#FFFFFF" />
  );
  const changeLanguage = (value: string | null) => {
    i18n.changeLanguage(value as Language);
  };
  const location = useLocation();
  const theme = useMantineTheme();
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("EN");
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const getStarted = () => {
    setDrawerOpened(false);
    navigate("/register");
  };
  const getLogin = () => {
    setDrawerOpened(false);
    navigate("/login");
  };
  const NavLinks = ({ onClick = () => {} }) => (
    <Flex
      direction={isMobile ? "column" : "row"}
      mt={isMobile ? "30px" : undefined}
      align="center"
      justify="space-between"
      w={isMobile ? "100%" : "377px"}
      gap={isMobile ? "xl" : undefined}
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
    setCurrentLanguage((prev) => (prev === "EN" ? "AR" : "EN"));
    setDrawerOpened(false);
  };
  return (
    <>
      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        padding="10px"
        size="xs"
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
          <Anchor
            c={COLORS.background}
            style={{
              textDecoration: "none",
              fontSize: "16px",
              paddingLeft: "20px",
              cursor: "pointer",
              borderBottom: `1px solid ${COLORS.buttonBorder}`,
              paddingBottom: "8px",
              width: "100%",
              textAlign: "left",
            }}
            onClick={() => {
              setDrawerOpened(false);
              getLogin();
            }}
          >
            {t("Sign in")}
          </Anchor>
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
              style={{ cursor: "pointer" }}
            >
              {currentLanguage === "EN" ? "AR" : "EN"}
            </Text>
          </Flex>
        </Flex>
        <Box mt="xl" px="20px">
          <Button
            variant="outline"
            size="md"
            color={COLORS.buttonBorder}
            fullWidth
            onClick={getStarted}
          >
            {t("Get started")}
          </Button>
        </Box>
      </Drawer>
      <Flex
        bg={COLORS.background}
        align="center"
        justify="space-between"
        px="xl"
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
                marginLeft: isMobile ? "0" : "60px",
              }}
            />
          </Box>
        </Flex>
        {!isMobile && <NavLinks />}
        <Flex align="center" gap="xl">
          {!isMobile && (
            <>
              <Anchor
                size="md"
                c={COLORS.text}
                style={{ textDecoration: "none" }}
                onClick={getLogin}
              >
                {t("Sign in")}
              </Anchor>
              <Button
                variant="outline"
                size="md"
                styles={{
                  root: {
                    borderColor: COLORS.buttonBorder,
                    color: COLORS.buttonBorder,
                    padding: "8px 16px",
                    borderRadius: "5px",
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: COLORS.hoverText,
                      borderColor: COLORS.buttonBorder,
                    },
                  },
                }}
                onClick={getStarted}
              >
                {t("Get started")}
              </Button>
            </>
          )}
          {!isMobile && (
            <Select
              data={[
                { value: "en", label: "English" },
                { value: "ar", label: "العربية" },
              ]}
              value={i18n.language}
              onChange={changeLanguage}
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
          )}
        </Flex>
      </Flex>
    </>
  );
}
