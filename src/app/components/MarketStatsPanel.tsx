"use client";
import React, { memo, useEffect, useState } from "react";
import { IDockviewPanelProps } from "dockview-core";
import { startMockPriceFeed, PriceDataPoint } from "@/lib/mockData";

interface MarketStats {
  lastPrice: number;
  totalVolume: number;
  priceChange: number;
}

interface CoinStats {
  [symbol: string]: MarketStats;
}

const MarketStatsPanel: React.FC<IDockviewPanelProps> = memo((props) => {
  console.log("MarketStatsPanel props:", props);

  const [stats, setStats] = useState<CoinStats>({
    BTCUSDT: { lastPrice: 50000, totalVolume: 0, priceChange: 0 },
    ETHUSDT: { lastPrice: 2000, totalVolume: 0, priceChange: 0 },
    BNBUSDT: { lastPrice: 300, totalVolume: 0, priceChange: 0 },
  });

  useEffect(() => {
    const coins = ["BTCUSDT", "ETHUSDT", "BNBUSDT"];
    const prevPrices: { [symbol: string]: number } = {
      BTCUSDT: 50000,
      ETHUSDT: 2000,
      BNBUSDT: 300,
    };

    const unsubscribes = coins.map((symbol) =>
      startMockPriceFeed((data: PriceDataPoint) => {
        const priceChange =
          ((data.price - prevPrices[symbol]) / prevPrices[symbol]) * 100;
        setStats((prev) => ({
          ...prev,
          [symbol]: {
            lastPrice: data.price,
            totalVolume: prev[symbol].totalVolume + data.volume,
            priceChange,
          },
        }));
        prevPrices[symbol] = data.price;
      })
    );

    return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        color: "#fff",
        background: "#1a1a1a",
        height: "100%",
        overflow: "auto",
      }}
    >
      <h2>Market Stats</h2>
      {Object.entries(stats).map(
        ([symbol, { lastPrice, totalVolume, priceChange }]) => (
          <div key={symbol} style={{ marginBottom: "20px" }}>
            <h3>{symbol}</h3>
            <p>Last Price: ${lastPrice.toFixed(2)}</p>
            <p>Total Volume: {totalVolume.toFixed(2)}</p>
            <p>Price Change: {priceChange.toFixed(2)}%</p>
            <br></br>
          </div>
        )
      )}
    </div>
  );
});

MarketStatsPanel.displayName = "MarketStatsPanel";

export default MarketStatsPanel;
