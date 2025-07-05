"use client";
import React, { useRef } from "react";
import { DockviewReact, DockviewReadyEvent } from "dockview-react";
import "dockview-core/dist/styles/dockview.css";
import { PriceChartPanel } from "./components/PriceChartPanel";
import LiveTradesPanelClient from "./components/LiveTradesPanelClient";
import MarketStatsPanel from "./components/MarketStatsPanel";

const DockviewLayout: React.FC = () => {
  const dockviewRef = useRef<any>(null);

  const onReady = (event: DockviewReadyEvent) => {
    const { api } = event;
    api.addPanel({
      id: "priceChart",
      component: "PriceChartPanel",
      title: "Price Chart",
      position: { referencePanel: undefined, direction: "within" },
    });
    api.addPanel({
      id: "liveTrades",
      component: "LiveTradesPanelClient",
      title: "Live Trades",
      position: { referencePanel: "priceChart", direction: "below" },
    });
    api.addPanel({
      id: "marketStats",
      component: "MarketStatsPanel",
      title: "Market Stats",
      position: { referencePanel: "priceChart", direction: "right" },
    });
  };

  return (
    <DockviewReact
      ref={dockviewRef}
      onReady={onReady}
      components={{ PriceChartPanel, LiveTradesPanelClient, MarketStatsPanel }}
      className="dockview-theme-dark"
    />
  );
};

export default DockviewLayout;
