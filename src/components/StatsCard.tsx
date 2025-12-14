import { Box, Flex, Text, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useSpring, motion, MotionValue, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
interface CountUpProps {
  targetValue: number;
  duration?: number;
  suffix?: string;
  decimal?: number;
  startCounting: boolean;
}
interface StaticProps {
  value: string;
}
function CountUpAnimation({
  targetValue,
  suffix = "",
  decimal = 0,
  startCounting,
}: CountUpProps) {
  const spring: MotionValue<number> = useSpring(0, {
    mass: 0.8,
    stiffness: 100,
    damping: 20,
  });
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (startCounting) {
      spring.set(targetValue);
    }
    if (ref.current && !startCounting) {
      ref.current.textContent = `0${suffix}`;
    }
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${latest
          .toFixed(decimal)
          .toLocaleString()}${suffix}`;
      }
    });
    return () => unsubscribe();
  }, [targetValue, suffix, decimal, startCounting]);

  return <motion.span ref={ref} />;
}
const StaticValue = ({ value }: StaticProps) => (
  <Text
    fw={400}
    fz={"64px"}
    c="#2C3131"
    style={{ lineHeight: "125%" }}
    className="font-adlam"
  >
    {value}
  </Text>
);
export default function StatsCard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const borderRightStyle = "1px solid #e0e0e0";
  const margin = isMobile ? "33px auto" : "100px auto";
  return (
    <Box
      p="xl"
      w={"90%"}
      style={{
        backgroundColor: "white",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        margin: margin,
      }}
      ref={ref}
    >
      <Flex
        justify="space-around"
        align="center"
        p="md"
        direction={isMobile ? "column" : "row"}
      >
        <Box
          ta="center"
          p="xl"
          style={{
            [isMobile ? "borderBottom" : "borderRight"]:
              isMobile || isMobile === undefined ? borderRightStyle : "none",
            borderRight: isMobile ? "none" : borderRightStyle,
            flexGrow: 1,
            paddingBottom: isMobile ? "20px" : "xl",
          }}
          w={isMobile ? "100%" : "auto"}
        >
          <Text
            fw={400}
            fz={"64px"}
            c="#2C3131"
            style={{ lineHeight: "125%" }}
            className="font-adlam"
          >
            <CountUpAnimation
              targetValue={30}
              suffix="k"
              duration={2}
              startCounting={isInView}
            />
          </Text>
          <Text
            c={"#000"}
            fz={"18px"}
            mt="xs"
            fw={"400"}
            style={{ lineHeight: "145%" }}
          >
            {t("Active User")}
          </Text>
        </Box>
        <Box
          ta="center"
          p="xl"
          style={{
            [isMobile ? "borderBottom" : "borderRight"]: isMobile
              ? borderRightStyle
              : borderRightStyle,
            borderRight: isMobile ? "none" : borderRightStyle,
            flexGrow: 1,
            paddingBottom: isMobile ? "20px" : "xl",
          }}
          w={isMobile ? "100%" : "auto"}
        >
          <Text
            fw={400}
            fz={"64px"}
            c="#2C3131"
            style={{ lineHeight: "125%" }}
            className="font-adlam"
          >
            <CountUpAnimation
              targetValue={50}
              suffix="k"
              duration={2}
              startCounting={isInView}
            />
          </Text>
          <Text
            c={"#000"}
            fz={"18px"}
            mt="xs"
            fw={"400"}
            style={{ lineHeight: "145%" }}
          >
            {t("Transactions")}
          </Text>
        </Box>
        <Box
          ta="center"
          p="xl"
          style={{
            borderRight: isMobile ? "none" : "none",
            borderBottom: "none",
            flexGrow: 1,
          }}
          w={isMobile ? "100%" : "auto"}
        >
          <StaticValue value={"24/7"} />
          <Text
            c={"#000"}
            fz={"18px"}
            mt="xs"
            fw={"400"}
            style={{ lineHeight: "145%" }}
          >
            {t("Customer Service")}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
