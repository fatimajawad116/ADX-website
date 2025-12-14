import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MantineProvider } from "@mantine/core";
import App from "./App";

export default function I18nWrapper() {
  const { i18n } = useTranslation();
  const direction = i18n.language === "ar" ? "rtl" : "ltr";
  useEffect(() => {
    document.dir = direction;
  }, [direction]);

  return (
    <MantineProvider>
      <App />
    </MantineProvider>
  );
}
