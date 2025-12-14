import React, { useEffect, useRef, memo } from "react";
const TRADING_VIEW_BASE_CONFIG = {
  width: "100%",
  // height: 600,
  height: "100%",
  interval: "D",
  timezone: "Etc/UTC",
  theme: "light",
  style: "1",
  locale: "en",
  toolbar_bg: "#f1f3f6",
  enable_publishing: false,
  allow_symbol_change: true,
  container_id: "tradingview_widget_container",
};

declare global {
  interface Window {
    TradingView?: {
      widget: new (config: Record<string, unknown>) => void;
    };
  }
}

const TradingViewChartWidget: React.FC<{ assetSymbol: string }> = ({
  assetSymbol,
}) => {
  const containerRef = useRef(null);
  const scriptId = "tradingview-widget-script";

  useEffect(() => {
    const config = {
      ...TRADING_VIEW_BASE_CONFIG,
      symbol: assetSymbol,
    };

    const loadWidget = () => {
      if (typeof window.TradingView !== "undefined") {
        const widgetContainer = document.getElementById(config.container_id);
        if (widgetContainer) {
          widgetContainer.innerHTML = "";
        }
        new window.TradingView.widget(config);
      }
    };

    if (document.getElementById(scriptId)) {
      loadWidget();
      return;
    }

    if (typeof window.TradingView === "undefined") {
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "text/javascript";
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;

      script.onload = () => {
        loadWidget();
      };

      document.head.appendChild(script);
    } else {
      loadWidget();
    }
  }, [assetSymbol]);

  return (
    <div
      className="tradingview-chart-wrapper"
      style={{
        height: `${TRADING_VIEW_BASE_CONFIG.height}px`,
        width: "100%",
        border: "1px solid #2962FF",
        borderRadius: "4px",
      }}
    >
      <div
        ref={containerRef}
        id={TRADING_VIEW_BASE_CONFIG.container_id}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
};

export default memo(TradingViewChartWidget);
