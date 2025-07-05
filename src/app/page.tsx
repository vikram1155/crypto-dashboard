"use client";

import dynamic from "next/dynamic";
import { DockviewReact, DockviewApi, DockviewReadyEvent } from "dockview-react";
import { PriceChartPanel } from "./components/PriceChartPanel";
import "dockview/dist/styles/dockview.css";
import React, { useRef } from "react";

const LiveTradesPanel = dynamic(
  () => import("./components/LiveTradesPanelClient"),
  {
    ssr: false,
  }
);

export default function HomePage() {
  const dockviewRef = useRef<DockviewApi | null>(null);

  const onReady = (event: DockviewReadyEvent) => {
    dockviewRef.current = event.api;

    event.api.addPanel({
      id: "trades",
      title: "Live Trades",
      component: "live-trades",
    });
    event.api.addPanel({
      id: "chart",
      title: "Price Chart",
      component: "price-chart",
    });
  };

  return (
    <DockviewReact
      components={{
        "live-trades": (props) => <LiveTradesPanel {...props} />,
        // "live-trades": <LiveTradesPanel />,
        "price-chart": PriceChartPanel,
      }}
      onReady={onReady}
      className="dockview-theme-abyss"
    />
  );
}
