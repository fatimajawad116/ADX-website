import React, { useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Box } from "@mantine/core";
import TradingView from "./TradingView";
interface CandlestickChartProps {
  assetSymbol: string;
  buyPrice: string;
  sellPrice: string;
}
type CandlestickDataPoint = {
  time: string;
  price: number;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  sma?: number;
  isCurrentTime?: boolean;
};

const rawData: Omit<CandlestickDataPoint, "sma">[] = [
  {
    time: "1:00",
    price: 9020.0,
    open: 9000,
    high: 9050,
    low: 8980,
    close: 9040,
    volume: 1500,
  },
  {
    time: "6:15",
    price: 9180.0,
    open: 9145,
    high: 9210,
    low: 9140,
    close: 9190,
    volume: 2400,
  },
];
const calculateSMA = (
  data: Omit<CandlestickDataPoint, "sma">[],
  period: number
): CandlestickDataPoint[] => {
  return data.map((point, index) => {
    let smaValue: number | undefined;
    if (index >= period - 1) {
      const periodSlice = data.slice(index - period + 1, index + 1);
      const sum = periodSlice.reduce((acc, curr) => acc + curr.close, 0);
      smaValue = sum / period;
    }
    return { ...point, sma: smaValue };
  });
};
const data = calculateSMA(rawData, 5);

const yDomain = [
  Math.min(...data.map((d) => d.low)) - 25,
  Math.max(...data.map((d) => d.high)) + 25,
];

const CandlestickChart: React.FC<CandlestickChartProps> = ({ assetSymbol }) => {
  const [chartType] = useState<"tradingview" | "line">("tradingview");
  const ACTIVE_COLOR = "#FF9B42";
  const BACKGROUND_COLOR = "#0A1F44";
  const BORDER_COLOR = "#1A3E72";
  const CustomTooltip = () => {
    return (
      <Tooltip
        contentStyle={{
          backgroundColor: BORDER_COLOR,
          border: "none",
          color: "#FFF",
        }}
        // formatter={(value, payload) => {
        //   const dataPoint = payload[0]?.payload as CandlestickDataPoint;
        //   if (dataPoint) {
        //     return [`Price: ${dataPoint.price.toFixed(2)}`, "Value"];
        //   }
        //   return [`${value.toFixed(2)}`, "Value"];
        // }}
        formatter={(value, payload) => {
          const dataPoint = (
            payload as unknown as { payload: CandlestickDataPoint }[]
          )?.[0]?.payload;

          if (dataPoint) {
            return [`Price: ${dataPoint.price.toFixed(2)}`, "Value"];
          }

          return [`${(value as number).toFixed(2)}`, "Value"];
        }}
        labelFormatter={(label) => `Time: ${label}`}
      />
    );
  };

  const ChartContent = () => {
    if (chartType === "tradingview") {
      return (
        <Box
          style={{
            height: 600,
            width: "100%",
          }}
        >
          <TradingView assetSymbol={assetSymbol} />
        </Box>
      );
    }
    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 0, left: 0, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={BORDER_COLOR}
            vertical={false}
          />
          <YAxis
            orientation="right"
            domain={yDomain}
            tick={{ fill: "#CFCFCF", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={60}
            tickFormatter={(value) =>
              value.toLocaleString("en-US", { minimumFractionDigits: 1 })
            }
          />
          <XAxis
            dataKey="time"
            tick={{ fill: "#CFCFCF", fontSize: 12 }}
            axisLine={{ stroke: BORDER_COLOR }}
            tickLine={false}
            height={25}
          />
          <CustomTooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke={ACTIVE_COLOR}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Box
      p="20px"
      style={{
        backgroundColor: BACKGROUND_COLOR,
        borderRadius: "10px",
        width: "100%",
        minWidth: "200px",
        border: "1px solid #1A3E72",
      }}
    >
      <ChartContent />
    </Box>
  );
};

export default React.memo(CandlestickChart);
