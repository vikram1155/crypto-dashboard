"use client";
import React, { useRef } from "react";
import { DockviewReact, DockviewApi, DockviewReadyEvent } from "dockview-react";
import { PriceChartPanel } from "../components/PriceChartPanel";
import "dockview/dist/styles/dockview.css";
// import LiveTradesPanelClient from "../components/LiveTradesPanelClient";

const Home = () => {
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
        // "live-trades": LiveTradesPanelClient,
        "price-chart": PriceChartPanel,
      }}
      onReady={onReady}
      className="dockview-theme-abyss"
    />
  );
};

export default Home;
