import { Box, useMantineTheme } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import type { Variants, Transition } from "framer-motion";

import imgBrand1 from "../assets/brand1.svg";
import imgBrand2 from "../assets/brand2.svg";
import imgBrand3 from "../assets/barnd3.svg";
import imgBrand4 from "../assets/brand4.svg";
import imgBrand5 from "../assets/brand5.svg";
import { useMediaQuery } from "@mantine/hooks";

const brandImages = [
  { src: imgBrand1, alt: "Brand 1" },
  { src: imgBrand2, alt: "Brand 2" },
  { src: imgBrand3, alt: "Brand 3" },
  { src: imgBrand4, alt: "Brand 4" },
  { src: imgBrand5, alt: "Brand 5" },
];

const duplicatedBrands = [
  ...brandImages,
  ...brandImages,
  ...brandImages,
  ...brandImages,
];

export default function BrandCompany() {
  const { i18n } = useTranslation();
  const theme = useMantineTheme();
  const isArabic = i18n.language === "ar";
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const dynamicGap = isMobile ? "33px" : "70px";
  const dynamicPadding = `0 ${dynamicGap}`;
  const marqueeEndValue = isArabic ? "50%" : "-50%";
  const dynamicMarqueeVariants: Variants = {
    animate: {
      x: [0, marqueeEndValue],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 50,
          ease: "linear",
        } as Transition,
      },
    },
  };
  return (
    <Box
      style={{
        overflow: "hidden",
        width: "100%",
        direction: isArabic ? "rtl" : "ltr",
      }}
      mt={"100px"}
      mb={"30px"}
    >
      <motion.div
        variants={dynamicMarqueeVariants}
        animate="animate"
        style={{
          display: "flex",
          width: "max-content",
          alignItems: "center",
          gap: dynamicGap,
          padding: dynamicPadding,
        }}
      >
        {duplicatedBrands.map((brand, index) => (
          <Box
            key={index}
            style={{
              flexShrink: 0,
            }}
          >
            <img
              src={brand.src}
              alt={brand.alt}
              width={isMobile ? "37px" : undefined}
            />
          </Box>
        ))}
      </motion.div>
    </Box>
  );
}
